using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Projects;

namespace Pilotair.Web.Controllers;

public class ProjectController(ProjectService projectService) : ApiController
{
    [HttpGet]
    public Task<IEnumerable<ProjectModel>> Get()
    {
        return projectService.ListAsync();
    }

    [HttpPost]
    public async Task PostAsync([FromBody] NewProjectModel model)
    {
        var domain = model.Domain;
        if (!string.IsNullOrWhiteSpace(model.Subdomain))
        {
            domain = $"{model.Subdomain}.{model.Domain}";
        }
        await projectService.CreateAsync(model.Name, domain);
    }

    [HttpDelete]
    public void Delete(string name)
    {
        projectService.DeleteAsync(name);
    }
}