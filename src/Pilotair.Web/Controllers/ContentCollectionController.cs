using Microsoft.AspNetCore.Mvc;
using Pilotair.Application.Contents;

namespace Pilotair.Web.Controllers;

public class ContentCollectionController(ContentCollectionStore collectionStore) : ApiController
{
    [HttpGet]
    public async Task<ContentCollectionModel> GetAsync(string name)
    {
        var collection = await collectionStore.GetAsync(name);
        if (collection == default)
        {
            throw new ContentCollectionNotFoundException();
        }

        return new ContentCollectionModel
        {
            Name = name,
            Fields = collection.Fields,
            Display = collection.Display
        };
    }

    [HttpPost]
    public async Task Post(ContentCollectionModel collection)
    {
        if (collectionStore.Exist(collection.Name))
        {
            throw new ContentCollectionExistException();
        }
        await collectionStore.SaveAsync(collection.Name, collection);
    }

    [HttpPut]
    public async Task Put(ContentCollectionModel collection)
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