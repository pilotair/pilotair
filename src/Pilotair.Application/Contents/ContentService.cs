using Pilotair.Core.Stores.NoSqlite;

namespace Pilotair.Application.Contents;

[Singleton]
public class ContentService(ContentCollectionStore collectionStore, ContentStore contentStore)
{
    public async Task<Document<IDictionary<string, object>>> GetContentAsync(string collection, string id)
    {
        collectionStore.ThrowIfNotFound(collection);
        var contents = contentStore.Get(collection);
        return await contents.GetAsync(id);
    }

    public async Task<ContentPagingResult> QueryAsync(ContentPagingQuery query)
    {
        collectionStore.ThrowIfNotFound(query.Collection);
        var contents = contentStore.GetOrCreate(query.Collection);
        var total = await contents.Query.CountAsync();
        var result = new ContentPagingResult(query, total);
        result.List = await contents.Query.Skip(result.GetSkip()).TakeAsync(result.Size);
        return result;
    }

    public async Task AddAsync(string collection, IDictionary<string, object> value)
    {
        collectionStore.ThrowIfNotFound(collection);
        var contents = contentStore.Get(collection);
        await contents.AddDocumentAsync(value);
    }

    public async Task UpdateAsync(string collection, string id, IDictionary<string, object> value)
    {
        collectionStore.ThrowIfNotFound(collection);
        var contents = contentStore.Get(collection);
        var content = await contents.GetAsync(id);
        content.Data = value;
        await contents.UpdateDocumentAsync(content);
    }

    public async Task DeleteAsync(string collection, string[] ids)
    {
        collectionStore.ThrowIfNotFound(collection);
        var contents = contentStore.Get(collection);
        foreach (var id in ids)
        {
            await contents.RemoveDocumentAsync(id);
        }
    }

    public async Task<Document<IDictionary<string, object>>> GetAsync(string collection, string id)
    {
        collectionStore.ThrowIfNotFound(collection);
        var contents = contentStore.Get(collection);
        return await contents.GetAsync(id);
    }
}