using Jint;
using Jint.Native;
using Jint.Runtime.Modules;
using Pilotair.Core.Runtime.ModuleResolvers;

namespace Pilotair.Core.Runtime;

public class JsEngine(EngineOptions options)
{
    private readonly Engine engine = new(o =>
    {
        o.Modules.ModuleLoader = new ModuleLoader([
            new FileModuleResolver(options)
        ]);
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