namespace IdentityServer4React.Authentication
{
    using System;
    using System.Threading.Tasks;
    using IdentityServer4.Events;
    using IdentityServer4.Extensions;
    using IdentityServer4.Services;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    public class AuthenticationController : Controller
    {
        private readonly IIdentityServerInteractionService interactionService;

        private readonly IEventService eventService;

        private readonly IUserService userService;

        public AuthenticationController(
            IIdentityServerInteractionService interactionService,
            IEventService eventService,
            IUserService userService)
        {
            this.interactionService = interactionService ?? throw new ArgumentNullException(nameof(interactionService));
            this.eventService = eventService ?? throw new ArgumentNullException(nameof(eventService));
            this.userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        [HttpPost]
        [Route("api/sign-in")]
        public async Task<IActionResult> SignIn([FromBody]SignInApiModel signIn)
        {
            // TODO: error responses
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest();
            }

            var validationResult = this.userService.Authenticate(signIn.Username, signIn.Password);
            if (!validationResult.IsSuccess)
            {
                await this.eventService.RaiseAsync(new UserLoginFailureEvent(signIn.Username, "invalid credentials"));
                return this.Unauthorized();
            }

            await this.eventService.RaiseAsync(new UserLoginSuccessEvent(
                username: signIn.Username,
                subjectId: validationResult.SubjectId,
                name: signIn.Username));

            // Only set explicit expiration here if user chooses "remember me".
            // otherwise we rely upon expiration configured in cookie middleware.
            AuthenticationProperties props = null;

            if (signIn.RememberLogin)
            {
                props = new AuthenticationProperties
                {
                    IsPersistent = true,
                    ExpiresUtc = DateTimeOffset.UtcNow.Add(TimeSpan.FromDays(30)),
                };
            }

            // Issue authentication cookie with subject ID and username
            await this.HttpContext.SignInAsync(
                subject: validationResult.SubjectId,
                name: signIn.Username,
                properties: props);

            // Make sure the returnUrl is still valid, and if so redirect back to authorize endpoint or a local page
            if (this.interactionService.IsValidReturnUrl(signIn.ReturnUrl) || this.Url.IsLocalUrl(signIn.ReturnUrl))
            {
                return this.Ok(new
                {
                    uri = signIn.ReturnUrl,
                });
            }

            // TODO: 422 result
            return this.BadRequest();
        }

        // TODO: make api models required
        [HttpGet]
        [Route("api/sign-outs/{signOutId}/context")]
        public async Task<IActionResult> GetSignOutContext(string signOutId = null)
        {
            var apiModel = await this.GetSignOutApiModel(signOutId);
            return this.Ok(apiModel);
        }

        [HttpPost]
        [Route("api/sign-out")]
        public async Task<IActionResult> SignOut([FromBody] SignOutResponseApiModel signOut)
        {
            var apiModel = await this.GetSignOutApiModel(signOut.SignOutId);

            if (this.User?.Identity?.IsAuthenticated == false)
            {
                return this.Ok(apiModel);
            }

            // Delete local authentication cookie
            await this.HttpContext.SignOutAsync();

            // Raise the logout event
            await this.eventService.RaiseAsync(
                new UserLogoutSuccessEvent(this.User.GetSubjectId(), this.User.GetDisplayName()));

            return this.Ok(apiModel);
        }

        private async Task<SignOutApiModel> GetSignOutApiModel(string signOutId)
        {
            var context = await this.interactionService.GetLogoutContextAsync(signOutId);

            var apiModel = new SignOutApiModel
            {
                SignOutId = signOutId,
                SignOutPrompt = true, // TODO: get from settings
                AutomaticRedirectAfterSignOut = false, // TODO: get from settings
                PostLogoutRedirectUri = context?.PostLogoutRedirectUri,
                ClientName = context?.ClientId,
                SignOutIframeUrl = context?.SignOutIFrameUrl,
            };

            if (this.User?.Identity?.IsAuthenticated != true)
            {
                // If the user is not authenticated,
                // then just show logged out page
                apiModel.SignOutPrompt = false;
                return apiModel;
            }

            if (context?.ShowSignoutPrompt == false)
            {
                // it's safe to automatically sign-out
                apiModel.SignOutPrompt = false;
                return apiModel;
            }

            // Show the logout prompt. this prevents attacks where the user
            // is automatically signed out by another malicious web page.
            return apiModel;
        }
    }
}