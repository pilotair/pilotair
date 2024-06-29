using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Accounts;

namespace Pilotair.Web.Controllers;

public class AccountController(AuthService authService, UserService userService) : ApiController
{
    [HttpPost("password-sign")]
    public async Task<string> PasswordSignAsync([FromBody] PasswordCredentials credentials)
    {
        var user = await userService.GetByUserNameAsync(credentials.UserName);
        user.ValidPassword(credentials.Password);
        return authService.GenerateJwtToken(user);
    }
}