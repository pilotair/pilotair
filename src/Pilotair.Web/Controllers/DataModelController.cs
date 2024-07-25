using Microsoft.AspNetCore.Mvc;
using Pilotair.Application.Contents;
using Pilotair.Application.DataModels;

namespace Pilotair.Web.Controllers;

public class DataModelController(ContentCollectionStore collectionStore) : ApiController
{
    [HttpGet("controls")]
    public string[] Controls()
    {
        return Enum.GetNames<ControlTypes>();
    }

    [HttpGet("content-collections")]
    public async Task<KeyValuePair<string, string>[]> ContentCollections()
    {
        var collections = await collectionStore.ListAsync();
        return collections.Select(s => new KeyValuePair<string, string>(s.Key, s.Value.Display ?? s.Key)).ToArray();
    }
}