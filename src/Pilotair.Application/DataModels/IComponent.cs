namespace Pilotair.Application.DataModels;

public interface IComponent
{
    public string Name { get; }
    public string Display { get; }
    public ValueType Type { get; }
    public bool Multiple { get; }
    public int Index { get; }
}