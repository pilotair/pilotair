using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Pilotair.Core.Resource;

namespace Pilotair.Cloud.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResourceController(ResourceService resourceService) : ControllerBase
{
    [HttpPost]
    public async Task PostAsync(string? folder, IFormFileCollection files)
    {
        await resourceService.SaveAsync(files, folder);
    }

    [HttpGet]
    public IEnumerable<StaticFile> Get(string? folder)
    {
        return resourceService.GetFiles(folder);
    }
}