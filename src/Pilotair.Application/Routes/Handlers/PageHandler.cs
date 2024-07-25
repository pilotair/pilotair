using Jint;
using Microsoft.AspNetCore.Http;
using Pilotair.Core.Runtime;

namespace Pilotair.Application.Routes.Handlers;

[Singleton(typeof(IRouteHandler))]
public class PageHandler() : IRouteHandler
{
    public string Name => "page";

    public int Order => 100;


    public async Task HandleAsync(HttpContext context, Core.Stores.Files.File file)
    {
        if (context == default) return;
        var engine = context.RequestServices.GetRequiredService<JsEngine>();
        var module = await engine.ExecuteAsync("./" + file.RelationPath);
        var function = module.Get("default");
        var result = function.Call().UnwrapIfPromise();
        module = await engine.ExecuteAsync("https://esm.sh/preact-render-to-string@6.4.2");
        var render = module.Get("render");
        var body = render.Call(result).AsString();
        await context.Response.WriteAsync(body);
    }
}