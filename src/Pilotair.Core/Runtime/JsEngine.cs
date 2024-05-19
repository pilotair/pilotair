using Jint;
using Jint.Native;
using Pilotair.Core.Runtime.ModuleResolvers;

namespace Pilotair.Core.Runtime;

public class JsEngine(EngineOptions? options = null)
{
    private readonly Engine engine = new(o =>
    {
        var moduleResolvers = new List<IModuleResolver>();

        if (options?.RootPath != default)
        {
            moduleResolvers.Add(new FileModuleResolver(options.RootPath));
        }

        if (options?.ModuleResolvers != default)
        {
            moduleResolvers.AddRange(options.ModuleResolvers);
        }

        o.Modules.ModuleLoader = new ModuleLoader(moduleResolvers);
    });

    public void AddModule(IModule module)
    {
        engine.Modules.Add(module.Name, builder =>
        {
            foreach (var item in module.Exports)
            {
                builder.ExportObject(item.Key, item.Value);
            }

            foreach (var item in module.Types)
            {
                builder.ExportType(item.Key, item.Value);
            }
        });
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

}