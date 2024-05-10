using System.Reflection;
using System.Text;
using Esprima.Ast;
using Jint;
using Jint.Native;

namespace Pilotair.Core.Runtime.Compilers;

public class Babel
{
    private readonly Script script;

    public Babel()
    {
        var assembly = Assembly.GetExecutingAssembly();
        var fileName = "Pilotair.Core.Runtime.Compilers.babel.min.js";
        using var stream = assembly.GetManifestResourceStream(fileName);

        if (stream == default)
        {
            throw new FileNotFoundException(fileName);
        }

        var code = new StreamReader(stream).ReadToEnd();
        var parser = new Esprima.JavaScriptParser();
        script = parser.ParseScript(code, null, true);
    }

    public string Compile(string code)
    {
        var engine = new Engine(options =>
        {
            options.Strict = true;
        });
        engine.SetValue("console", new FakeConsole());

        engine.Execute(script);
        var babel = engine.GetValue("Babel");
        var transform = babel.Get("transform").AsFunctionInstance();
        var options = new Dictionary<string, object> {
            {"presets", new []{ "typescript"} },
            {"filename", "example.ts" },
        };
        var result = transform.Call([
            JsValue.FromObject(engine, code),
             JsValue.FromObject(engine, options)
        ]);
        return result.Get("code").AsString();
    }
}

public class FakeConsole
{

    public void Log()
    {

    }

    public void Warn()
    {

    }
}