using Pilotair.Web.Menus;

namespace Pilotair.Web.Contents;

[Singleton]
public class ContentCollectionService(ContentCollectionStore collectionStore) : IMenuProvider
{
    public async Task<IEnumerable<MenuItem>> GetMenuItemsAsync(string currentPath = "")
    {
        var result = new List<MenuItem>();
        var collections = await collectionStore.ListAsync();

        foreach (var collection in collections)
        {
            result.Add(new MenuItem
            {
                Type = MenuItem.Types.ContentCollection,
                Name = collection.Name,
                Display = collection.Display,
                Folder = "content-collections"
            });
        }
        return result;
    }
}