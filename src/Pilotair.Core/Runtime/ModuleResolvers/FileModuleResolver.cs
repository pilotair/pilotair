using Esprima;
using Jint.Runtime.Modules;
using Pilotair.Core.Helpers;

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

    public string Load(Jint.Engine engine, ResolvedSpecifier resolved)
    {
        if (resolved.Uri == default) throw new ModuleNotFoundException();
        var code = File.ReadAllText(resolved.Uri.AbsolutePath);
        return code;
    }

    public ResolvedSpecifier? TryResolve(string? referencingModuleLocation, ModuleRequest moduleRequest)
    {
        if (!PathHelper.IsRelative(moduleRequest.Specifier))
        {
            return null;
        }

        var basePath = rootPath;

        if (referencingModuleLocation != default)
        {
            if (referencingModuleLocation.StartsWith("file://", true, default))
            {
                basePath = Path.GetDirectoryName(referencingModuleLocation)!;
            }
            else
            {
                return default;
            }
        }

        var path = Path.GetFullPath(moduleRequest.Specifier, basePath);

        if (!path.StartsWith(rootPath))
        {
            throw new ModulePathOutOfRangeException();
        }

        var uri = new Uri($"{Scheme}://{path}");
        return new ResolvedSpecifier(moduleRequest, uri.ToString(), uri, SpecifierType.RelativeOrAbsolute);
    }
}