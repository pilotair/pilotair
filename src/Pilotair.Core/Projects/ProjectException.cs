namespace Pilotair.Core.Projects;

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

public class ProjectExistException(string name) : PilotairException($"Project '{name}' exist")
{
}
