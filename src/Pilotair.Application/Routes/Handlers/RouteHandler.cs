using Jint;
using Microsoft.AspNetCore.Http;
using Pilotair.Application.Modules.Http;
using Pilotair.Core.Helpers;
using Pilotair.Core.Runtime;

namespace Pilotair.Application.Routes.Handlers;

[Singleton(typeof(IRouteHandler))]
public class RouteHandler() : IRouteHandler
{
    public string Name => "route";

    public int Order => 1;

    public async Task HandleAsync(HttpContext context, Core.Stores.Files.File file)
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