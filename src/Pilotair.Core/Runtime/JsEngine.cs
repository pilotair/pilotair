using Jint;
using Jint.Native;
using Pilotair.Core.Runtime.ModuleResolvers;

namespace Pilotair.Core.Runtime;

public class JsEngine(EngineOptions options)
{
    public Task<JsValue> ExecuteAsync(string specifier)
    {
        var task = new Task<JsValue>(() =>
        {
            var engine = new Jint.Engine(o =>
            {
                o.Modules.ModuleLoader = new ModuleLoader([
                    new FileModuleResolver(options)
                ]);
            });

            var result = engine.Modules.Import(specifier);
            return result.UnwrapIfPromise();
        });
        task.Start();
        return task;
    }
}