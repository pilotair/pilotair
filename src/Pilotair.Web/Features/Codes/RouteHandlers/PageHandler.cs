using Jint;
using Pilotair.Core.Helpers;
using Pilotair.Web.Modules.Http;

namespace Pilotair.Web.Codes.RouteHandlers;

[Singleton(typeof(IRouteHandler))]
public class PageHandler() : IRouteHandler
{
    public string Name => "page";

    public int Order => 100;

    public async Task HandleAsync(HttpContext context, File file)
    {
        if (context == default) return;
        var module = await context.GetEngine().ExecuteAsync("./" + file.RelationPath);
        var function = module.Get("default");
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