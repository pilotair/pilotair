// using Microsoft.AspNetCore.Mvc;
// using Pilotair.Core.Project;

// namespace Pilotair.Cloud.Controllers;

// public class ProjectController(ProjectService projectService) : ControllerBase
// {
//     [HttpGet("{id}")]
//     public IProject Get(Guid id)
//     {
//         return projectService.Get(id);
//     }

//     [HttpGet]
//     public IEnumerable<IProject> Get()
//     {
//         return projectService.All();
//     }

//     [HttpPost("{type}/{name}")]
//     public async Task<IProject> PostAsync(ProjectType type, string name)
//     {
//         return await projectService.CreateAsync(type, name);
//     }

//     // [HttpPut("settings/{id}")]
//     // public IProject Put(Guid id, [FromBody] UpdateSettings settings)
//     // {
//     //     var application = appService.Get(id);
//     //     application.Update(settings);
//     //     return appService.Get(id);
//     // }

//     [HttpDelete("{id}")]
//     public void Remove(Guid id)
//     {
//         projectService.Remove(id);
//     }
// }