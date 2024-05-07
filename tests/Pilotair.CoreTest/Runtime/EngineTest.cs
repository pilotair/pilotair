using Pilotair.Core.Runtime;

namespace Pilotair.CoreTest;

[TestClass]
public class EngineTest
{

    [TestMethod]
    public async Task ExecuteJavascript()
    {
        var engine = CreateEngine();
        var module = await engine.ExecuteAsync("./execute_javascript.js");
        var result = module.Get("msg");
        Assert.AreEqual(result.ToString(), "hello world!");
    }

    [TestMethod]
    public async Task ImportModule()
    {
        var engine = CreateEngine();
        var module = await engine.ExecuteAsync("./module_import.js");
        var result = module.Get("default");
        Assert.AreEqual(result.ToString(), "hello world!");
    }

    private static JsEngine CreateEngine()
    {
        var src = TestResource.GetFolder("src");
      
        var engine = new JsEngine(new EngineOptions
        {
            RootPath = src
        });

        return engine;
    }
}