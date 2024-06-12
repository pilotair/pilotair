using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Projects;

namespace Pilotair.Web.Controllers;

public class ProjectController(ProjectService projectService) : ApiController
{
    [HttpGet]
    public IEnumerable<ProjectModel> Get()
    {
        return projectService.List();
    }

    [HttpPost]
    public void Post([FromBody] NewProjectModel model)
    {
        
    }
}