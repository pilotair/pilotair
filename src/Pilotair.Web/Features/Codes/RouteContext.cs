namespace Pilotair.Web.Codes;

public class RouteContext(CodeService.Route route)
{
    public async Task HandleAsync(HttpContext context)
    {
        var engineAccessor = context.RequestServices.GetRequiredService<EngineAccessor>();
        var module = await engineAccessor.Engine.ExecuteAsync("./" + route.File.RelationPath);
        await route.Handler.HandleAsync(module);
    }
}