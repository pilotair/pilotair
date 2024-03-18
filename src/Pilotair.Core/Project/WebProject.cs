
namespace Pilotair.Core.Project;

public class WebProject : IProject
{
    public Guid Id { get; }

    public required string Name { get; init; }

    public required string Path { get; init; }
}