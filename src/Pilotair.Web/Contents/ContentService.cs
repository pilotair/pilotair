using Pilotair.Core.Stores.NoSqlite;

namespace Pilotair.Web.Contents;

[Scoped]
public class ContentService(ContentCollectionStore collectionStore, ContentStore contentStore)
{
    public async Task<Document<IDictionary<string, object>>> GetContentAsync(string collection, string id)
    {
        var contents = contentStore.Get(collection);
        return await contents.GetAsync(id);
    }

    public async Task AddContentAsync(string collection, IDictionary<string, object> value)
    {
        var contents = contentStore.Get(collection);
        await contents.AddDocumentAsync(value);
    }
}