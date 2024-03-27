using Esprima;
using Jint;
using Jint.Runtime.Modules;
using Microsoft.Extensions.Options;

namespace Pilotair.Core.CodeEngine.ModuleResolvers;

public class FileModuleResolver(IOptions<CodeOptions> codeOptions) : IModuleResolver
{
    public string Scheme => Uri.UriSchemeFile;

    public bool IsMatch(string referencingModuleLocation)
    {
        return referencingModuleLocation.StartsWith("./") || referencingModuleLocation.StartsWith("../");
    }

    public Module Load(Engine engine, ResolvedSpecifier resolved)
    {
        var javaScriptParser = new JavaScriptParser();
        var code = File.ReadAllText(resolved.Uri.AbsolutePath);
        var module = javaScriptParser.ParseModule(code, resolved.Uri.AbsolutePath);
        return ModuleFactory.BuildSourceTextModule(engine, module);
    }

    public ResolvedSpecifier Resolved(string? referencingModuleLocation, ModuleRequest moduleRequest)
    {
        var path = referencingModuleLocation == default
        ? Path.Combine(Path.GetFullPath(codeOptions.Value.RootPath), moduleRequest.Specifier) :
        Path.Combine(Path.GetDirectoryName(referencingModuleLocation), moduleRequest.Specifier);
        var uri = new Uri($"{Uri.UriSchemeFile}://{path}");
        if (!File.Exists(uri.AbsolutePath)) uri = new Uri($"{Uri.UriSchemeFile}://{path}.js");
        return new ResolvedSpecifier(moduleRequest, path, uri, SpecifierType.RelativeOrAbsolute);
    }
}