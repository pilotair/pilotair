using Jint;
using Jint.Native;
using Pilotair.Core.Helpers;
using Pilotair.Web.Modules.Http;

namespace Pilotair.Web.Codes.RouteHandlers;

[Singleton(typeof(IRouteHandler))]
public class PageHandler(IHttpContextAccessor httpContextAccessor) : IRouteHandler
{
    public string Name => "page";

    public int Order => 100;

    public async Task HandleAsync(JsValue jsValue)
    {
        var context = httpContextAccessor.HttpContext;
        if (context == default) return;
        var function = jsValue.Get("default");
        var result = function.Call().UnwrapIfPromise();
        string? body;

        if (result.IsObject() && result.ToObject() is JsonResponse response)
        {
            body = JsonHelper.Serialize(response.Body);
        }
        else
        {
            body = result.ToString();
        }

        await context.Response.WriteAsync(body);
    }
}