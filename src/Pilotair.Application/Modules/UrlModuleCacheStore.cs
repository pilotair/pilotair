using System.IO;
using Microsoft.Extensions.Options;
using Pilotair.Core.Helpers;
using Pilotair.Core.Runtime.ModuleResolvers;

namespace Pilotair.Application.Modules;

[Singleton(typeof(IUrlModuleCacheStore))]
public class UrlModuleCacheStore(IOptions<PilotairOptions> options) : IUrlModuleCacheStore
{
    private readonly string folder = Path.Combine(options.Value.DataPath, Constants.URL_MODULES_CACHE);
    public void AddCode(Uri uri, string code)
    {
        var path = UriToPath(uri);
        IoHelper.EnsureFolderExist(Path.GetDirectoryName(path)!);
        System.IO.File.WriteAllText(path, code);
    }

    public bool TryGetCode(Uri uri, out string code)
    {
        var path = UriToPath(uri);
        if (!File.Exists(path))
        {
            code = string.Empty;
            return false;
        }
        code = File.ReadAllText(path);
        return true;
    }

    private string UriToPath(Uri uri)
    {
        var path = Path.Combine(folder, uri.Host);
        foreach (var segment in uri.Segments)
        {
            var name = segment.Trim(' ', '/', '\\');
            if (name == string.Empty) continue;
            path = Path.Combine(path, name);
        }

        return path;
    }
}