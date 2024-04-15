using Microsoft.Extensions.Options;
using Pilotair.Core.Runtime;
using Pilotair.Core.Runtime.ModuleResolvers;

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
        var module = await engine.ExecuteAsync("./module_import");
        var result = module.Get("default");
        Assert.AreEqual(result.ToString(), "hello world!");
    }

    private static Engine CreateEngine()
    {
        var mock = new Moq.Mock<IOptions<EngineOptions>>();
        var src = TestResource.GetFolder("src");
        mock.SetupGet(s => s.Value).Returns(new EngineOptions
        {
            RootPath = src
        });
        var engine = new Engine(new ModuleLoader([new FileModuleResolver(mock.Object)]));
        return engine;
    }
}