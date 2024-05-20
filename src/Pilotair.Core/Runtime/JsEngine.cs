using Jint;
using Jint.Native;
using Jint.Runtime.Modules;
using Pilotair.Core.Runtime.ModuleResolvers;

namespace Pilotair.Core.Runtime;

public class JsEngine
{
    private readonly Engine engine;
    private readonly EngineOptions? engineOptions;
    private readonly HashSet<Uri> modules = [];

    public JsEngine(EngineOptions? options = null)
    {
        engineOptions = options;
        engine = new(Config);
    }

    public Task<JsValue> ExecuteAsync(string specifier)
    {
        var task = new Task<JsValue>(() =>
        {
            var result = engine.Modules.Import(specifier);
            return result.UnwrapIfPromise();
        });
        task.Start();
        return task;
    }

    public void AddModule(Uri uri, Action<ModuleBuilder> action)
    {
        if (modules.Contains(uri)) return;
        modules.Add(uri);
        engine.Modules.Add(uri.ToString(), action);
    }

    private void Config(Options options)
    {
        var moduleResolvers = new List<IModuleResolver>();

        if (engineOptions?.RootPath != default)
        {
            moduleResolvers.Add(new FileModuleResolver(engineOptions.RootPath));
        }

        if (engineOptions?.ModuleResolvers != default)
        {
            moduleResolvers.AddRange(engineOptions.ModuleResolvers);
        }

        options.Modules.ModuleLoader = new ModuleLoader
        {
            ModuleResolvers = moduleResolvers,
            ModuleTransformers = engineOptions?.ModuleTransformers,
            Engine = this
        };
    }
}