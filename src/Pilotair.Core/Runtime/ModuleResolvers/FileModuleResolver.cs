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

    public string Load(Jint.Engine engine, Uri uri)
    {
        var code = File.ReadAllText(uri.AbsolutePath);
        return code;
    }

    public ModuleResolved? TryResolve(string? referencingModuleLocation, ModuleRequest moduleRequest)
    {
        if (!PathHelper.IsRelative(moduleRequest.Specifier))
        {
            return null;
        }

        var basePath = rootPath;

        if (referencingModuleLocation != default)
        {
            if (referencingModuleLocation.StartsWith(Scheme + "://", true, default))
            {
                basePath = Path.GetDirectoryName(new Uri(referencingModuleLocation).AbsolutePath)!;
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

        return new ModuleResolved(new Uri($"{Scheme}://{path}"), SpecifierType.RelativeOrAbsolute);
    }
}