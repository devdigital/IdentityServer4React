namespace IdentityServer4React.Authentication
{
    public interface IUserService
    {
        ValidationResult Authenticate(string username, string password);
    }
}