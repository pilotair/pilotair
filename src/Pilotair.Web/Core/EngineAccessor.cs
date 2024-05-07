using Microsoft.Extensions.Options;
using Pilotair.Core.Runtime;
using Pilotair.Web.Modules.Http;

namespace Pilotair.Web;

public class EngineAccessor
{
    public JsEngine Engine { get; init; }
    public EngineAccessor(IOptions<PilotairOptions> options, IEnumerable<IModule> modules)
    {
        Engine = new JsEngine(new EngineOptions
        {
            RootPath = Path.Combine(options.Value.DataPath, Constants.CODES_FOLDER)
        });

        foreach (var module in modules)
        {
            Engine.AddModule(module);
        }
    }
}