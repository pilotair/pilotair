using System.Reflection;
using System.Text;
using Esprima.Ast;
using Jint;
using Jint.Native;
using Jint.Native.Function;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Runtime.Compilers;

public class Babel
{
    private readonly Script script;
    private readonly (Function func, Engine engine) env;

    public Babel()
    {
        var fileName = "Pilotair.Core.Runtime.Compilers.babel.min.js";
        var code = AssemblyHelper.GetEmbeddedResource<Babel>(fileName);
        var parser = new Esprima.JavaScriptParser();
        script = parser.ParseScript(code, "babel.min.js", true);
        env = GetEnv();
    }

    public string Compile(string code, string name = "default.tsx")
    {
        lock (this)
        {
            var options = new Dictionary<string, object> {
                {"presets", new []{ "typescript","react"} },
                {"filename", name },
            };
            var result = env.func.Call([
                JsValue.FromObject(env.engine, code),
             JsValue.FromObject(env.engine, options)
            ]);
            return result.Get("code").AsString();
        }
    }

    private (Function func, Engine engine) GetEnv()
    {
        var engine = new Engine(options =>
        {
            options.Strict = true;
        });
        engine.SetValue("console", new FakeConsole());

        engine.Execute(script);
        var babel = engine.GetValue("Babel");
        var transform = babel.Get("transform").AsFunctionInstance();
        return (transform, engine);
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