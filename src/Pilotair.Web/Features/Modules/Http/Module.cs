using Pilotair.Core.Runtime;

namespace Pilotair.Web.Modules.Http;

public class HttpModule : IModule
{
    private readonly Dictionary<string, object> exports = [];
    public string Name => "pilotairhttp";
    public IDictionary<string, object> Exports => exports;

    public HttpModule(Request request)
    {
        exports.Add("request", request);
    }
}