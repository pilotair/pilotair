namespace Pilotair.Core.Projects;

public interface IProject
{
    Guid Id { get; }
    string Name { get; }
    Task SaveAsync();
    void Remove();
}