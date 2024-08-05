using Pilotair.Application.Contents;

namespace Pilotair.Web.Menus.Providers;

[Singleton(typeof(IMenuProvider))]
public class ContentMenuProvider(ContentCollectionStore store) : IMenuProvider
{
    public async Task<IEnumerable<MenuItem>> GetMenuItemsAsync(string currentPath = "")
    {
        var result = new List<MenuItem>
        {
            new()
            {
                Order=10,
                Name="contents",
                Type=MenuItem.Types.Contents,
                Children=await GetChildrenAsync()
            }
        };
        return result;
    }

    public async Task<IEnumerable<MenuItem>> GetChildrenAsync(string currentPath = "")
    {
        var result = new List<MenuItem>();
        var collections = await store.ListAsync();

        foreach (var collection in collections)
        {
            result.Add(new MenuItem
            {
                Type = MenuItem.Types.ContentCollection,
                Name = collection.Key,
                Display = collection.Value.Display,
            });
        }
        return result;
    }
}