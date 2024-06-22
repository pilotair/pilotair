using System.IO;
using Jint;
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

    public string Load(Engine engine, Uri uri)
    {
        var code = File.ReadAllText(uri.AbsolutePath);
        return code;
    }

    public ModuleResolved? TryResolve(string? reference, string specifier, JsEngine engine)
    {
        if (!PathHelper.IsRelative(specifier))
        {
            return null;
        }

        var basePath = rootPath;

        if (reference != default)
        {
            if (reference.StartsWith(Scheme + "://", true, default))
            {
                basePath = Path.GetDirectoryName(new Uri(reference).AbsolutePath)!;
            }
            else
            {
                return default;
            }
        }

        var path = Path.GetFullPath(specifier, basePath);

        if (!path.StartsWith(rootPath))
        {
            throw new ModulePathOutOfRangeException();
        }

        return new ModuleResolved(new Uri($"{Scheme}://{path}"), SpecifierType.RelativeOrAbsolute);
    }
}