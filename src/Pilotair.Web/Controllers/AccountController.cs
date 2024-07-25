using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Pilotair.Application.Accounts;

namespace Pilotair.Web.Controllers;

public class AccountController : ApiController
{
    [HttpPost("password-sign")]
    public async Task PasswordSignAsync([FromBody] PasswordCredentials credentials)
    {
        var authenticationProperties = new AuthenticationProperties();
        authenticationProperties.SetParameter(nameof(PasswordCredentials), credentials);
        await HttpContext.ChallengeAsync(JwtBearerDefaults.AuthenticationScheme, authenticationProperties);
    }
}