namespace IdentityServer4React.Authentication
{
    public class SignOutApiModel
    {
        public bool ShowSignOutPrompt { get; set; }

        public bool AutomaticRedirectAfterSignOut { get; set; }

        public string PostLogoutRedirectUri { get; set; }

        public string ClientName { get; set; }

        public string SignOutIframeUrl { get; set; }

        public string SignOutId { get; set; }
    }
}