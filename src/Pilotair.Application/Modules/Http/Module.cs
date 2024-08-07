
namespace Pilotair.Application.Modules.Http;

[Scoped]
public class HttpModule
{
    private readonly Dictionary<string, object> exports = [];
    private readonly Dictionary<string, Type> types = [];
    public string Name => "pilotair://http/";
    public IDictionary<string, object> Exports => exports;

    public IDictionary<string, Type> Types => types;

    public HttpModule(Request request)
    {
        exports.Add("request", request);
        types.Add("TextResponse", typeof(TextResponse));
        types.Add("JsonResponse", typeof(JsonResponse));
    }
}