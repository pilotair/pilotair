using System.Text.Encodings.Web;
using System.Text.Json;
using Jint;
using Pilotair.Core.Helpers;
using Pilotair.Core.Runtime;
using Pilotair.Web.Modules.Http;

namespace Pilotair.Web.Codes;

public class RouteContext(Code code)
{
    public async Task HandleAsync(HttpContext context)
    {
        var engineAccessor = context.RequestServices.GetRequiredService<EngineAccessor>();
        var module = await engineAccessor.Engine.ExecuteAsync("./" + code.RelationPath);
        var handler = module.Get(context.Request.Method);
        var result = handler.Call().UnwrapIfPromise();
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