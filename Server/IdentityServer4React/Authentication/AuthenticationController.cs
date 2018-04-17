namespace IdentityServer4React.Authentication
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using IdentityServer4.Events;
    using IdentityServer4.Services;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    public class AuthenticationController : Controller
    {
        private readonly IIdentityServerInteractionService interactionService;

        private readonly IEventService eventService;

        public AuthenticationController(
            IIdentityServerInteractionService interactionService,
            IEventService eventService)
        {
            this.interactionService = interactionService ?? throw new ArgumentNullException(nameof(interactionService));
            this.eventService = eventService ?? throw new ArgumentNullException(nameof(eventService));
        }

        [HttpPost]
        [Route("api/authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]SignInApiModel signIn)
        {
            // TODO: error responses
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest();
            }

            var validationResult = ValidateUser(signIn.Username, signIn.Password);
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

        private static ValidationResult ValidateUser(string username, string password)
        {
            // TODO: user service
            var user = Config.GetUsers().FirstOrDefault(u => u.Username == username);
            if (user == null)
            {
                return ValidationResult.Failure();
            }

            return string.CompareOrdinal(user.Password, password) == 0
                ? ValidationResult.Success(user.SubjectId)
                : ValidationResult.Failure();
        }
    }
}