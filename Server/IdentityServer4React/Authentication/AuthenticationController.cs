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
        private IIdentityServerInteractionService interactionService;

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
        public async Task<IActionResult> Authenticate([FromBody]AuthenticationApiModel authentication)
        {
            // TODO: error responses
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest();
            }

            // TODO: user service
            var user = Config.GetUsers().FirstOrDefault(u => u.Username == authentication.Username);
            if (user == null)
            {
                return this.Unauthorized();
            }

            if (string.CompareOrdinal(user.Password, authentication.Password) != 0)
            {
                return this.Unauthorized();
            }

            await this.eventService.RaiseAsync(new UserLoginSuccessEvent(
                username: user.Username,
                subjectId: user.SubjectId,
                name: user.Username));

            // Only set explicit expiration here if user chooses "remember me".
            // otherwise we rely upon expiration configured in cookie middleware.
            AuthenticationProperties props = null;

            if (authentication.RememberLogin)
            {
                props = new AuthenticationProperties
                {
                    IsPersistent = true,
                    ExpiresUtc = DateTimeOffset.UtcNow.Add(TimeSpan.FromDays(30)),
                };
            }

            // Issue authentication cookie with subject ID and username
            await this.HttpContext.SignInAsync(
                subject: user.SubjectId,
                name: user.Username,
                properties: props);

            // Make sure the returnUrl is still valid, and if so redirect back to authorize endpoint or a local page
            if (this.interactionService.IsValidReturnUrl(authentication.ReturnUrl) || this.Url.IsLocalUrl(authentication.ReturnUrl))
            {
                return this.Ok();

                // return this.Redirect(authentication.ReturnUrl);
            }

            // TODO: 422 result
            return this.BadRequest();
        }
    }
}