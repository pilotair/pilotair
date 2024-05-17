using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.Files;

namespace Pilotair.Web.Codes;

[Singleton]
public class CodeService
{
    private readonly FileStore store;
    private readonly IEnumerable<IRouteHandler> routeHandlers;

    public FileStore Store => store;

    public CodeService(IOptions<PilotairOptions> options, IEnumerable<IRouteHandler> routeHandlers)
    {
        this.routeHandlers = routeHandlers;
        var root = Path.Combine(options.Value.DataPath, Constants.CODES_FOLDER);
        store = new FileStore(root);
    }

    public async Task<Code> GetCodeAsync(string path)
    {
        var fileInfo = store.GetFile(path);
        var content = await store.ReadTextAsync(path);
        return new Code(fileInfo, content, store.Root);
    }

    public IEnumerable<MenuItem> GetMenuItems(string currentPath = "")
    {
        var items = new List<MenuItem>();
        var entries = store.GetFolder(currentPath);

        foreach (var entry in entries)
        {
            var item = new MenuItem
            {
                Name = entry.Name,
                Order = default,
                Type = entry.IsFolder ? MenuItem.Types.CodeFolder : MenuItem.Types.Code,
            };

            items.Add(item);

            if (entry.IsFolder)
            {
                var path = Path.Combine(currentPath, entry.Name);
                item.Children = GetMenuItems(path);
            }
        }

        return items;
    }

    public record Route(Core.Stores.Files.File File, IRouteHandler Handler);
    public IEnumerable<Route> GetRoutes()
    {
        var result = new List<Route>();

        foreach (var handler in routeHandlers)
        {
            var paths = Directory.GetFiles(store.Root, $"{handler.Name}.tsx", SearchOption.AllDirectories);
            foreach (var path in paths)
            {
                var file = store.GetFile(path);
                result.Add(new Route(file, handler));
            }
        }

        return result;
    }
}