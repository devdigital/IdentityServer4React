using System.Security.Claims;
using IdentityModel;

namespace IdentityServer4React
{
    using System.Collections.Generic;
    using IdentityServer4;
    using IdentityServer4.Models;
    using IdentityServer4.Test;

    public class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api1", "My API"),
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "react-client",
                    ClientName = "React Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,

                    // Where to redirect to after login
                    RedirectUris = { "http://localhost:8080/signed-in" },

                    // Where to redirect to after logout
                    // PostLogoutRedirectUris = { "http://localhost:8080/signed-out" },
                    AllowedCorsOrigins = new List<string>
                    {
                        "http://localhost:8080",
                    },

                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                    },
                },
            };
        }

        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "alice",
                    Password = "password",
                    Claims = new List<Claim>
                    {
                        new Claim("sub", "1"),
                    },
                },
                new TestUser
                {
                    SubjectId = "2",
                    Username = "bob",
                    Password = "password",
                    Claims = new List<Claim>
                    {
                        new Claim("sub", "2"),
                    },
                },
            };
        }
    }
}