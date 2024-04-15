using Jint;
using Jint.Native;

namespace Pilotair.Core.Runtime;

public class Engine(ModuleLoader moduleLoader)
{
    public Task<JsValue> ExecuteAsync(string specifier)
    {
        var task = new Task<JsValue>(() =>
        {
            var engine = new Jint.Engine(o =>
            {
                o.Modules.ModuleLoader = moduleLoader;
            });

            var result = engine.Modules.Import(specifier);
            return result.UnwrapIfPromise();
        });
        task.Start();
        return task;
    }
}