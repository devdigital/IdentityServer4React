namespace IdentityServer4React.Authentication
{
    using System.ComponentModel.DataAnnotations;

    public class AuthenticationApiModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public bool RememberLogin { get; set; }

        [Required]
        public string ReturnUri { get; set; }
    }
}