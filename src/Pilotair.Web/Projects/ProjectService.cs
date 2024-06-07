using Microsoft.Extensions.Options;

namespace Pilotair.Web.Projects;

[Singleton]
public class ProjectService(IOptions<PilotairOptions> options)
{
    public Project Create(string name)
    {
        var project = new Project
        {
            Folder = options.Value.DataPath,
            Name = name,
        };

        return project;
    }
}