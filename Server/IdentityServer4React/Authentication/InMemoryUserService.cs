namespace IdentityServer4React.Authentication
{
    using System.Linq;

    public class InMemoryUserService : IUserService
    {
        public ValidationResult Authenticate(string username, string password)
        {
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