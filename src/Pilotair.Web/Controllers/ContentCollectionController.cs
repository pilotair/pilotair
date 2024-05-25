using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Contents;

namespace Pilotair.Web.Controllers;

public class ContentCollectionController(ContentCollectionStore collectionStore) : ApiController
{
    [HttpGet]
    public async Task<ContentCollection> GetAsync(string name)
    {
        var collection = await collectionStore.GetAsync(name);
        if (collection == default)
        {
            throw new ContentCollectionNotFoundException();
        }
        return collection;
    }

    [HttpPost]
    public async Task Post(ContentCollection collection)
    {
        if (collectionStore.Exist(collection.Name))
        {
            throw new ContentCollectionExistException();
        }
        await collectionStore.SaveAsync(collection.Name, collection);
    }

    [HttpPut]
    public async Task Put(ContentCollection collection)
    {
        if (!collectionStore.Exist(collection.Name))
        {
            throw new ContentCollectionNotFoundException();
        }
        await collectionStore.SaveAsync(collection.Name, collection);
    }

    [HttpDelete]
    public void Delete(string name)
    {
        collectionStore.Delete(name);
    }
}