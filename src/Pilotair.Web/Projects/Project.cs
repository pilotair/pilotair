namespace Pilotair.Web.Projects;

public class Project
{
    public required string Path { get; init; }
    public required string Name { get; init; }
    public required ProjectEndpointDataSource Endpoints { get; init; }
}