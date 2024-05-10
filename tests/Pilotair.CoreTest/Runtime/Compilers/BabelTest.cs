using Pilotair.Core.Runtime.Compilers;

namespace Pilotair.CoreTest.Runtime.Compilers;

[TestClass]
public class BabelTest()
{
    [TestMethod]
    public void Compile()
    {
        var babel = new Babel();
        var result = babel.Compile("function foo(msg:string){return 'bar'}");
        Assert.AreEqual(result, "function foo(msg) {\n  return 'bar';\n}");
    }
}