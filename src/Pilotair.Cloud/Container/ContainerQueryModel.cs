using Pilotair.Core.Project;

namespace Pilotair.Cloud.Container;

public class ContainerQueryModel
{
    public int Size { get; set; } = 12;
    public string? Before { get; set; }
    public ProjectType? Type { get; set; }
}