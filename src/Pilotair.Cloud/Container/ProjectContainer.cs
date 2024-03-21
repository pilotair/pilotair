using Pilotair.Core.Project;

namespace Pilotair.Cloud.Container;

public class ProjectContainer
{
    public required WebProject Project { get; init; }

    public bool Created { get; set; }
}