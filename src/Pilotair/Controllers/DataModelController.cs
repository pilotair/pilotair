using Microsoft.AspNetCore.Mvc;
using Pilotair.Application;
using Pilotair.Application.Contents;
using Pilotair.Application.DataModels;

namespace Pilotair.Controllers;

public class DataModelController(ContentCollectionStore collectionStore, DataModelService dataModelService) : ApiController
{
    [HttpGet("components")]
    public IComponent[] Components()
    {
        return dataModelService.GetComponents();
    }

    [HttpGet("content-collections")]
    public async Task<KeyValuePair<string, string>[]> ContentCollections()
    {
        var collections = await collectionStore.ListAsync();
        return collections.Select(s => new KeyValuePair<string, string>(s.Key, s.Value.Display ?? s.Key)).ToArray();
    }
}