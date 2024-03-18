namespace Pilotair.Core.Project;

public class ProjectException(string? message) : PilotairException(message)
{
    public IProject? Project { get; set; }
}

public class ProjectNotFoundException() : PilotairException("Project not found")
{
}
