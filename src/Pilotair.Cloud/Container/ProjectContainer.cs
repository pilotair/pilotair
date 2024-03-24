using Pilotair.Core.Project;

namespace Pilotair.Cloud.Container;

public class ProjectContainer
{
    public required IProject Project { get; init; }

    public bool Created { get; set; }
}