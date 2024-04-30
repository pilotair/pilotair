using Jint;

namespace Pilotair.Web.Codes;

public class RouteContext(Code code)
{
    public async Task HandleAsync(HttpContext context)
    {
        var engine = context.RequestServices.GetRequiredService<Core.Runtime.Engine>();
        var module = await engine.ExecuteAsync("./" + code.RelationPath);
        var handler = module.Get(context.Request.Method);
        var result = handler.Call().UnwrapIfPromise();
        await context.Response.WriteAsync(result.ToString());
    }
}