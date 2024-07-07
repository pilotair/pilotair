using System.IO;
using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.Files;
using Pilotair.Web.Menus;
using Pilotair.Web.Routes;

namespace Pilotair.Web.Codes;

[Singleton]
public class CodeService(CodeStore store, IEnumerable<IRouteHandler> routeHandlers)
{
    private readonly FileStore store = store;
    private readonly IEnumerable<IRouteHandler> routeHandlers = routeHandlers;

    public async Task<Code> GetCodeAsync(string folder, string name)
    {
        var fileInfo = store.GetFile(folder, name);
        var content = await store.ReadTextAsync(fileInfo.RelationPath);
        return new Code(fileInfo, content, store.Root);
    }

    public IEnumerable<FileRoute> GetRoutes()
    {
        var result = new List<FileRoute>();

        foreach (var handler in routeHandlers)
        {
            var paths = Directory.GetFiles(store.Root, $"{handler.Name}.tsx", SearchOption.AllDirectories);
            foreach (var path in paths)
            {
                var file = store.GetFile(Path.GetRelativePath(store.Root, path));
                result.Add(new FileRoute(file, handler));
            }
        }

        return result;
    }
}