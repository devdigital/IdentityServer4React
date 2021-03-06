﻿namespace IdentityServer4React.Authentication
{
    public class SignedOutApiModel
    {
        public string SignOutId { get; set; }

        public bool AutomaticRedirectAfterSignOut { get; set; }

        public string PostLogoutRedirectUri { get; set; }

        public string ClientName { get; set; }

        public string SignOutIframeUrl { get; set; }
    }
}