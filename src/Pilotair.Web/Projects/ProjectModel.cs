namespace Pilotair.Web.Projects;

public class ProjectModel(Project project)
{
    public string Name { get; set; } = project.Name;
}