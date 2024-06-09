namespace Pilotair.Web.Projects;

[Scoped]
public class ProjectAccessor
{
    public Project? Project { get; set; }

    public string Path { get; set; } = "www";
}