using Microsoft.AspNetCore.Mvc;
using Pilotair.Cloud.Containers;
using Pilotair.Cloud.Services;

namespace Pilotair.Cloud.Controllers;

public class ContainerController(ProjectService projectService, ContainerService containerService) : ControllerBase
{
    [HttpGet]
    public async Task<IEnumerable<Container>> GetAsync()
    {
        var result = new List<Container>();
        var projects = projectService.All();

        foreach (var project in projects)
        {
            var container = await containerService.GetAsync(project.Id.ToString(), HttpContext.RequestAborted);
            result.Add(new Container
            {
                Project = project,
                Created = container != default,
                Running = container?.State == "running"
            });
        }

        return result;
    }

    [HttpPost]
    public async Task PostAsync(ContainerModel model)
    {
        var project = await projectService.CreateAsync(model.Name);
        await containerService.RunAsync(project, HttpContext.RequestAborted);
    }

    [HttpPut("run/{id}")]
    public async Task RunAsync(Guid id)
    {
        var project = projectService.Get(id);
        await containerService.RunAsync(project, HttpContext.RequestAborted);
    }

    // [HttpDelete("remove/{id}")]
    // public async Task DeleteAsync(Guid id)
    // {
    //     var project = projectService.Get(id);
    //     await containerService.RunAsync(project, HttpContext.RequestAborted);
    // }
}