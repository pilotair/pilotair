using Microsoft.AspNetCore.Http.Extensions;
using Pilotair.Core.Helpers;

namespace Pilotair.Web.Modules.Http;

public class Request
{
    private readonly HttpContext httpContext;
    public Request(IHttpContextAccessor accessor)
    {
        if (accessor.HttpContext == default)
        {
            throw new NotInHttpContextException();
        }

        httpContext = accessor.HttpContext;
    }

    public string Method => httpContext.Request.Method;
    public string Url => httpContext.Request.GetEncodedUrl();
    public async Task<object> Json()
    {
        return await JsonHelper.DeserializeAsync<dynamic>(httpContext.Request.Body, httpContext.RequestAborted);
    }
}