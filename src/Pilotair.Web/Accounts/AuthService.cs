using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Pilotair.Web.Accounts;

[Singleton]
public class AuthService(IOptionsMonitor<JwtBearerOptions> options)
{
    public const string ISSUER = "pilotair";

    public string GenerateJwtToken(UserModel user)
    {
        var jwtOptions = options.Get(JwtBearerDefaults.AuthenticationScheme);
        var securityKey = jwtOptions.TokenValidationParameters.IssuerSigningKeys.FirstOrDefault();
        var securityTokenDescriptor = new SecurityTokenDescriptor
        {
            Claims = new Dictionary<string, object> {
                { ClaimTypes.NameIdentifier, user.Id},
                { ClaimTypes.Name, user.UserName},
             },
            Issuer = ISSUER,
            Expires = DateTime.UtcNow.Add(TimeSpan.FromDays(7)),
            SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
        };
        return new JsonWebTokenHandler().CreateToken(securityTokenDescriptor);
    }
}