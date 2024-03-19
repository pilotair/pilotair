using Microsoft.AspNetCore.Mvc;
using Pilotair.Cloud.Services;
using Pilotair.Core.Project;

namespace Pilotair.Cloud.Controllers;

[ApiController]
[Route("__api__/[controller]")]
public class ProjectController(ProjectService projectService) : ControllerBase
{
    [HttpGet("{id}")]
    public WebProject Get(Guid id)
    {
        return projectService.Projects[id];
    }

    [HttpGet]
    public IEnumerable<WebProject> Get()
    {
        return projectService.Projects.Values;
    }

    [HttpPost]
    public async Task<WebProject> PostAsync(string name)
    {
        return await projectService.CreateAsync(name);
    }

    // [HttpPut("settings/{id}")]
    // public Pilotair.Core.Application.App Put(Guid id, [FromBody] UpdateSettings settings)
    // {
    //     var application = appService.Get(id);
    //     application.Update(settings);
    //     return appService.Get(id);
    // }

    // [HttpDelete("{id}")]
    // public void Remove(Guid id)
    // {
    //     appService.Remove(id);
    // }
}