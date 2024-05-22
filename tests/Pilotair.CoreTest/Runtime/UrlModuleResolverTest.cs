
using Pilotair.Core.Runtime;
using Pilotair.Core.Runtime.ModuleResolvers;

namespace Pilotair.CoreTest.Runtime;

[TestClass]
public class UrlModuleResolverTest
{

    [TestMethod, Ignore]
    public async Task LoadFromEsmDotSh()
    {
        var options = new EngineOptions
        {
            RootPath = TestResource.GetPath("src"),
            ModuleResolvers = [new HttpsModuleResolver(new HttpClient())]
        };
        var engine = new JsEngine(options);
        var module = await engine.ExecuteAsync("./import_from_url.js");
        var result = module.Get("version");
        Assert.AreEqual(result.ToString(), "18.2.0");
    }
}