using Microsoft.AspNetCore.Mvc;
using Pilotair.Application;
using Pilotair.Application.Contents;
using Pilotair.Core.Stores.NoSqlite;

namespace Pilotair.Controllers;

public class ContentController(ContentService contentService) : ApiController
{
    [HttpGet]
    public Task<ContentPagingResult> GetAsync([FromQuery] ContentPagingQuery model)
    {
        return contentService.QueryAsync(model);
    }

    [HttpGet("{collection}/{id}")]
    public Task<Document<IDictionary<string, object>>> GetAsync(string collection, string id)
    {
        return contentService.GetAsync(collection, id);
    }

    [HttpPost("{collection}")]
    public Task PostAsync(string collection, [FromBody] IDictionary<string, object> value)
    {
        return contentService.AddAsync(collection, value);
    }

    [HttpPut("{collection}/{id}")]
    public Task PutAsync(string collection, string id, [FromBody] IDictionary<string, object> value)
    {
        return contentService.UpdateAsync(collection, id, value);
    }

    [HttpDelete]
    public async Task DeleteAsync(string collection, [FromQuery] string[] ids)
    {
        await contentService.DeleteAsync(collection, ids);
    }
}