using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Pilotair.Core;

namespace Pilotair.Web.Accounts;

[Singleton]
public class JsonWebTokenEvents(UserService userService, IOptionsMonitor<JwtBearerOptions> options) : JwtBearerEvents
{
    public const string ISSUER = "pilotair";
    public const string COOKIE_NAME = "access_token";

    public async override Task Challenge(JwtBearerChallengeContext context)
    {
        var credentials = context.Properties.GetParameter<PasswordCredentials>(nameof(PasswordCredentials));
        if (credentials != null)
        {
            try
            {
                var user = await userService.GetByUserNameAsync(credentials.UserName);
                user.ValidPassword(credentials.Password);
                var token = GenerateJwtToken(user);
                context.Response.Headers.TryAdd(HeaderNames.WWWAuthenticate, token);
                context.HandleResponse();
            }
            catch (NotFoundException<User>)
            {
                //Challenge field, do nothing
            }
        }
    }

    public override Task MessageReceived(MessageReceivedContext context)
    {
        if (context.HttpContext.Request.Cookies.TryGetValue(COOKIE_NAME, out var token))
        {
            context.Token = token;
        }
        return Task.CompletedTask;
    }

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