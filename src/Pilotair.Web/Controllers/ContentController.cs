using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Contents;

namespace Pilotair.Web.Controllers;

public class ContentController(ContentService contentService) : ApiController
{
    [HttpGet]
    public Task<ContentPagingResult> GetAsync([FromQuery] ContentPagingQuery model)
    {
        return contentService.QueryAsync(model);
    }

    [HttpPost]
    public Task PostAsync(string collection, [FromBody] IDictionary<string, object> value)
    {
        return contentService.AddContentAsync(collection, value);
    }
}