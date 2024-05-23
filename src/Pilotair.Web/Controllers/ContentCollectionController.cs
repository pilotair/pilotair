using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Contents;

namespace Pilotair.Web.Controllers;

public class ContentCollectionController(ContentCollectionStore collectionStore) : ApiController
{
    [HttpPost]
    public async Task Post(ContentCollection collection)
    {
        await collectionStore.SaveAsync(collection.Name, collection);
    }
}