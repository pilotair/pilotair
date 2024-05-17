using Esprima;
using Jint.Runtime.Modules;

namespace Pilotair.Core.Runtime.ModuleResolvers;

public class FileModuleResolver(EngineOptions codeOptions) : IModuleResolver
{
    public string Scheme => Uri.UriSchemeFile;

    public bool IsMatch(string referencingModuleLocation)
    {
        return referencingModuleLocation.StartsWith("./") || referencingModuleLocation.StartsWith("../");
    }

    public Module Load(Jint.Engine engine, ResolvedSpecifier resolved)
    {
        var javaScriptParser = new JavaScriptParser();
        var code = File.ReadAllText(resolved.Uri.AbsolutePath);
        
        if (Path.GetExtension(resolved.Uri.AbsolutePath) == ".tsx")
        {
            code = Esbuild.Bundler.Transform(code, new Esbuild.TransformOptions
            {
                Loader = Esbuild.Loader.Tsx
            });
        }

        var module = javaScriptParser.ParseModule(code, resolved.Uri.AbsolutePath);
        return ModuleFactory.BuildSourceTextModule(engine, module);
    }

    public ResolvedSpecifier Resolved(string? referencingModuleLocation, ModuleRequest moduleRequest)
    {
        var path = referencingModuleLocation == default
        ? Path.Combine(Path.GetFullPath(codeOptions.RootPath), moduleRequest.Specifier) :
        Path.Combine(Path.GetDirectoryName(referencingModuleLocation), moduleRequest.Specifier);
        var uri = new Uri($"{Uri.UriSchemeFile}://{path}");
        if (!File.Exists(uri.AbsolutePath)) uri = new Uri($"{Uri.UriSchemeFile}://{path}");
        return new ResolvedSpecifier(moduleRequest, path, uri, SpecifierType.RelativeOrAbsolute);
    }
}