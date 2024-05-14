using System.Text.Encodings.Web;
using System.Text.Json;
using Jint.Native;
using Microsoft.AspNetCore.Http.Extensions;
using Pilotair.Core.Helpers;
using Pilotair.Core.Runtime;

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
    public async Task<JsValue> Json()
    {
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            PropertyNameCaseInsensitive = true,
            Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
        };
        options.Converters.Add(new JsValueConverter(new Jint.Engine()));
        return await JsonSerializer.DeserializeAsync<JsValue>(httpContext.Request.Body, options, httpContext.RequestAborted);
    }
}