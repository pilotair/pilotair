using System.IO;
using Pilotair.Core.Stores.Files;
using Pilotair.Web.Menus;
using Pilotair.Web.Projects;
using Pilotair.Web.Routes;

namespace Pilotair.Web.Codes;

[Scoped]
public class CodeService : IMenuProvider
{
    private readonly FileStore store;
    private readonly IEnumerable<IRouteHandler> routeHandlers;

    public FileStore Store => store;

    public CodeService(ProjectContext projectContext, IEnumerable<IRouteHandler> routeHandlers)
    {
        this.routeHandlers = routeHandlers;
        if (string.IsNullOrWhiteSpace(projectContext.Path))
        {
            throw new ProjectNotFoundException();
        }
        var root = Path.Combine(projectContext.Path, Constants.CODES_FOLDER);
        store = new FileStore(root);
    }

    public async Task<Code> GetCodeAsync(string folder, string name)
    {
        var fileInfo = store.GetFile(folder, name);
        var content = await store.ReadTextAsync(fileInfo.RelationPath);
        return new Code(fileInfo, content, store.Root);
    }

    public async Task<IEnumerable<MenuItem>> GetMenuItemsAsync(string currentPath = "")
    {
        var items = new List<MenuItem>();
        var entries = store.GetFolder(currentPath);

        foreach (var entry in entries)
        {
            var item = new MenuItem
            {
                Name = entry.Name,
                Type = entry.IsFolder ? MenuItem.Types.CodeFolder : MenuItem.Types.Code,
                Folder = Path.GetDirectoryName(entry.RelationPath),
            };

            items.Add(item);

            if (entry.IsFolder)
            {
                var path = Path.Combine(currentPath, entry.Name);
                item.Children = await GetMenuItemsAsync(path);
            }
        }

        return items;
    }

    public IEnumerable<FileRoute> GetRoutes()
    {
        var result = new List<FileRoute>();

        foreach (var handler in routeHandlers)
        {
            var paths = Directory.GetFiles(store.Root, $"{handler.Name}.tsx", SearchOption.AllDirectories);
            foreach (var path in paths)
            {
                var file = store.GetFile(path);
                result.Add(new FileRoute(file, handler));
            }
        }

        return result;
    }
}