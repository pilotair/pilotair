using Microsoft.Extensions.Options;
using Pilotair.Core.Runtime;
using Pilotair.Core.Runtime.ModuleResolvers;

namespace Pilotair.Web;

[Singleton]
public class EngineAccessor(
    IHttpContextAccessor contextAccessor,
    IOptions<PilotairOptions> options,
    IHttpClientFactory httpClientFactory,
    IUrlModuleCacheStore moduleCacheStore)
{
    public JsEngine RequestEngine => GetRequestEngine();
    private readonly string engineName = "request_engine";
    private readonly object locker = new();

    private JsEngine GetRequestEngine()
    {
        if (contextAccessor.HttpContext == default)
        {
            throw new ArgumentNullException(nameof(HttpContext));
        }

        lock (locker)
        {
            if (contextAccessor.HttpContext.Items.TryGetValue(engineName, out var engine))
            {
                return (engine as JsEngine)!;
            }

            var result = CreateEngine();
            var modules = contextAccessor.HttpContext.RequestServices.GetRequiredService<IEnumerable<IModule>>();

            foreach (var module in modules)
            {
                result.AddModule(module);
            }

            contextAccessor.HttpContext.Items.Add(engineName, result);
            return result;
        }
    }

    private JsEngine CreateEngine()
    {
        var engine = new JsEngine(new EngineOptions
        {
            RootPath = Path.Combine(options.Value.DataPath, Constants.CODES_FOLDER),
            ModuleResolvers = [
                new HttpModuleResolver(httpClientFactory.CreateClient(), moduleCacheStore),
                new HttpsModuleResolver(httpClientFactory.CreateClient(), moduleCacheStore)
            ],
            ModuleTransformers = [new TsxModuleTransformer()]
        });
        return engine;
    }
}