namespace Pilotair.Core.Runtime;

public interface IModule
{
    public string Name { get; }
    public IDictionary<string, object> Exports { get; }
}