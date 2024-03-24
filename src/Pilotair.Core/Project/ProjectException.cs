namespace Pilotair.Core.Project;

public class ProjectException(string? message) : PilotairException(message)
{
    public IProject? Project { get; set; }
}

public class ProjectNotFoundException : PilotairException
{
    public ProjectNotFoundException() : base("Project not found")
    {

    }

    public ProjectNotFoundException(string path) : base($"Project '{path}' not found")
    {
    }
}
