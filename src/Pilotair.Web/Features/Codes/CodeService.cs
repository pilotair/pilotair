using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.Files;

namespace Pilotair.Web.Codes;

public class CodeService
{
    private readonly FileStore store;

    public FileStore Store => store;
    
    public CodeService(IOptions<PilotairOptions> options)
    {
        var root = Path.Combine(options.Value.DataPath, Constants.CODES_FOLDER);
        store = new FileStore(root);
    }

    public async Task<Code> GetCodeAsync(string folder, string name)
    {
        var fileInfo = store.GetFile(folder, name);
        var content = await store.ReadTextAsync(folder, name);
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

    public IEnumerable<Core.Stores.Files.File> GetRoutes()
    {
        var paths = Directory.GetFiles(store.Root, "route.js", SearchOption.AllDirectories);
        var files = new List<Core.Stores.Files.File>();

        foreach (var item in paths)
        {
            var file = store.GetFile(item);
            files.Add(file);
        }

        return files;
    }
}