using Jint;
using Pilotair.Core.Helpers;
using Pilotair.Core.Runtime;
using Pilotair.Core.Stores.Files;
using Pilotair.Web.Modules.Http;

namespace Pilotair.Web.Routes.Handles;

[Singleton(typeof(IRouteHandler))]
public class RouteHandler() : IRouteHandler
{
    public string Name => "route";

    public int Order => 1;

    public async Task HandleAsync(HttpContext context, File file)
    {
        if (context == default) return;
        var engine = context.RequestServices.GetRequiredService<JsEngine>();
        var module = await engine.ExecuteAsync("./" + file.RelationPath);
        var function = module.Get(context.Request.Method);
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