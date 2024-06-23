namespace Pilotair.Web.Projects;

public class NewProjectModel
{
    public required string Name { get; set; }

    public required string Domain { get; set; }
    public string? Subdomain { get; set; }
}