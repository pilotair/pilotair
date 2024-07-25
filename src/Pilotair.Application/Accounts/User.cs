
namespace Pilotair.Application.Accounts;

public class User
{
    public required string UserName { get; set; }
    public string? Password { get; set; }
    public string? Role { get; set; }
}