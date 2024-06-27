using Pilotair.Core.Stores.NoSqlite;

namespace Pilotair.Web.Contents;

[Singleton]
public class ContentService(ContentCollectionStore collectionStore, ContentStore contentStore)
{
    public async Task<Document<IDictionary<string, object>>> GetContentAsync(string collection, string id)
    {
        var contents = contentStore.Get(collection);
        return await contents.GetAsync(id);
    }

    public async Task<ContentPagingResult> QueryAsync(ContentPagingQuery query)
    {
        var contentCollection = await collectionStore.GetAsync(query.Collection);
        if (contentCollection == default)
        {
            throw new ContentCollectionNotFoundException();
        }

        var contents = contentStore.GetOrCreate(query.Collection);
        var total = await contents.Query.CountAsync();
        var result = new ContentPagingResult(query, total);
        result.List = await contents.Query.Skip(result.GetSkip()).TakeAsync(result.Size);
        return result;
    }

    public async Task AddContentAsync(string collection, IDictionary<string, object> value)
    {
        var contentCollection = await collectionStore.GetAsync(collection);
        if (contentCollection == null) throw new ContentCollectionNotFoundException();
        var contents = contentStore.Get(collection);
        await contents.AddDocumentAsync(value);
    }
}