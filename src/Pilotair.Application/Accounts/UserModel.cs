namespace Pilotair.Application.Accounts;

public class UserModel : User
{
    public required string Id { get; init; }

    public void ValidPassword(string password)
    {
        if (password is null)
        {
            throw new ArgumentNullException(nameof(password));
        }

        if (password != Password)
        {
            throw new PasswordInvalidException();
        }
    }
}