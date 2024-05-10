using Pilotair.Core.Runtime.Compilers;

namespace Pilotair.CoreTest.Runtime.Compilers;

[TestClass]
public class BabelTest()
{
    [TestMethod]
    public void Compile()
    {
        var babel = new Babel();
        var result = babel.Compile("function foo(msg:string){return <div>bar</div>}");
        Assert.AreEqual(result, "function foo(msg) {\n  return /*#__PURE__*/React.createElement(\"div\", null, \"bar\");\n}"
);
    }

    [TestMethod]
    public void CompileNormalSizeCode()
    {
        var babel = new Babel();
        var code = TestResource.GetText("sample.tsx");
        babel.Compile(code);
    }

    [TestMethod]
    public void BatchCompile()
    {
        var babel = new Babel();
        var code = TestResource.GetText("sample.tsx");
        Parallel.ForEach(Enumerable.Range(0, 50), (i) =>
        {
            babel.Compile(code);
        });
    }
}