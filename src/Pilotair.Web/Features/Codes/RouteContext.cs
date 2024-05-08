using Jint;

namespace Pilotair.Web.Codes;

public class RouteContext(Code code)
{
    public async Task HandleAsync(HttpContext context)
    {
        var engineAccessor = context.RequestServices.GetRequiredService<EngineAccessor>();
        var module = await engineAccessor.Engine.ExecuteAsync("./" + code.RelationPath);
        var handler = module.Get(context.Request.Method);
        var result = handler.Call().UnwrapIfPromise();
        await context.Response.WriteAsync(result.ToString());
    }
}