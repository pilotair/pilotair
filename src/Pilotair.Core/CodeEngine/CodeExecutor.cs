using Jint;
using Jint.Native;

namespace Pilotair.Core.CodeEngine;

public class CodeExecutor(ModuleLoader moduleLoader)
{
    public Task<JsValue> ExecuteAsync(string specifier)
    {
        var task = new Task<JsValue>(() =>
        {
            var engine = new Engine(o =>
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