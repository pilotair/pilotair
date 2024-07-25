using System.IO;
using Pilotair.Core.Runtime;

namespace Pilotair.Web;

public class TsxModuleTransformer : IModuleTransformer
{
    public bool Match(Uri uri)
    {
        return ".tsx".Equals(Path.GetExtension(uri.AbsolutePath), StringComparison.CurrentCultureIgnoreCase);
    }

    public string Transform(string code)
    {
        return Esbuild.Bundler.Transform(code, new Esbuild.TransformOptions
        {
            Loader = Esbuild.Loader.Tsx,
            JsxImportSource = "https://esm.sh/preact@10.22.0",
            Jsx = Esbuild.Jsx.Automatic
        });
    }
}