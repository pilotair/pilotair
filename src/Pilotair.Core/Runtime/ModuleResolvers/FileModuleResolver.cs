using Esprima;
using Jint.Runtime.Modules;

namespace Pilotair.Core.Runtime.ModuleResolvers;

public class FileModuleResolver : IModuleResolver
{
    private readonly string rootPath;

    public FileModuleResolver(string rootPath)
    {
        if (!Path.IsPathRooted(rootPath))
        {
            rootPath = Path.GetFullPath(rootPath);
        }
        this.rootPath = rootPath;
    }

    public string Scheme => Uri.UriSchemeFile;

    public bool IsMatch(string specifier)
    {
        return specifier.StartsWith("./") || specifier.StartsWith("../");
    }

    public Module Load(Jint.Engine engine, ResolvedSpecifier resolved)
    {
        if (resolved.Uri == default) throw new ModuleNotFoundException();
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
        var basePath = referencingModuleLocation == default ? rootPath : Path.GetDirectoryName(referencingModuleLocation)!;
        var path = Path.GetFullPath(moduleRequest.Specifier, basePath);
        if (!path.StartsWith(rootPath))
        {
            throw new ModulePathOutOfRangeException();
        }
        var uri = new Uri($"{Scheme}://{path}");
        return new ResolvedSpecifier(moduleRequest, uri.ToString(), uri, SpecifierType.RelativeOrAbsolute);
    }
}