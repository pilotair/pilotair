using System.IO;
using Pilotair.Application.Codes;
using Pilotair.Core.Stores.Files;

namespace Pilotair.Menus.Providers;

[Singleton(typeof(IMenuProvider))]
public class CodeMenuProvider(CodeStore store) : IMenuProvider
{
    public async Task<IEnumerable<MenuItem>> GetMenuItemsAsync(string currentPath = "")
    {
        var result = new List<MenuItem>
        {
            new()
            {
                Order=20,
                Name="codes",
                Type=MenuItem.Types.Codes,
                Children=await GetChildrenAsync()
            }
        };
        return result;
    }

    public async Task<IEnumerable<MenuItem>> GetChildrenAsync(string currentPath = "")
    {
        var items = new List<MenuItem>();
        var entries = store.GetFolder(currentPath);

        foreach (var entry in entries)
        {
            var isFolder = entry.Type == EntryType.Folder;

            var item = new MenuItem
            {
                Name = entry.Name,
                Type = isFolder ? MenuItem.Types.CodeFolder : MenuItem.Types.Code,
                Folder = Path.GetDirectoryName(entry.RelationPath),
            };

            items.Add(item);

            if (isFolder)
            {
                var path = Path.Combine(currentPath, entry.Name);
                item.Children = await GetChildrenAsync(path);
            }
        }

        return items;
    }
}