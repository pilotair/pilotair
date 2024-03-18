using Microsoft.AspNetCore.Mvc;
using Pilotair.Core.Project;

namespace Pilotair.Cloud.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectController(ProjectService appService) : ControllerBase
{

    // [HttpGet("{id}")]
    // public Pilotair.Core.Application.App Get(Guid id)
    // {
    //     return appService.Get(id);
    // }

    // [HttpGet]
    // public Pilotair.Core.Application.App[] Get()
    // {
    //     return appService.List.ToArray();
    // }

    // [HttpPost]
    // public Pilotair.Core.Application.App Post(string name)
    // {
    //     return appService.Add(name);
    // }

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