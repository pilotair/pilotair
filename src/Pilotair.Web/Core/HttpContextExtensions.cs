using Pilotair.Core.Runtime;

namespace Pilotair.Web;

public static class HttpContextExtensions
{
    public static JsEngine GetEngine(this HttpContext context)
    {
        var accessor = context.RequestServices.GetRequiredService<EngineAccessor>();
        return accessor.RequestEngine;
    }
}