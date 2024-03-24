using Microsoft.AspNetCore.Mvc;
using Pilotair.Core.Project;

namespace Pilotair.Cloud.Controllers;

public class ProjectController(ProjectFactory projectFactory) : ControllerBase
{
    [HttpGet("{id}")]
    public IProject Get(Guid id)
    {
        return projectFactory.Projects[id];
    }

    [HttpGet]
    public IEnumerable<IProject> Get()
    {
        return projectFactory.Projects.Values;
    }

    [HttpPost("{type}/{name}")]
    public async Task<IProject> PostAsync(ProjectType type, string name)
    {
        return await projectFactory.CreateAsync(type, name);
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