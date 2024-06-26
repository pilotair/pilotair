using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Contents;

namespace Pilotair.Web.Controllers;

public class ContentController(ContentCollectionStore collectionStore, ContentStore contentStore) : ApiController
{
    
    [HttpGet]
    public async Task<ContentPagingResult> GetAsync([FromQuery] ContentPagingQuery query)
    {
        var contentCollection = await collectionStore.GetAsync(query.Collection);
        if (contentCollection == default)
        {
            throw new ContentCollectionNotFoundException();
        }

        var contents = contentStore.GetOrCreate(contentCollection.Name);
        var total = await contents.Query.CountAsync();
        var result = new ContentPagingResult(query, total);
        result.List = await contents.Query.Skip(result.GetSkip()).TakeAsync(result.Size);
        return result;
    }

    [HttpPost]
    public async Task PostAsync()
    {
        var contents = contentStore.GetOrCreate("demo");
        // contents.AddDocumentAsync()
    }
}