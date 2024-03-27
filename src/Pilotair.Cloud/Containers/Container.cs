using Pilotair.Core.Projects;

namespace Pilotair.Cloud.Containers;

public class Container
{
    public required IProject Project { get; init; }

    public required bool Created { get; set; }

    public required bool Running { get; set; }
}