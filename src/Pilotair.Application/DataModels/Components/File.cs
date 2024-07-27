namespace Pilotair.Application.DataModels.Components;

[Singleton(typeof(IComponent))]
public class File : IComponent
{
    public string Name => "file";

    public ValueType Type => ValueType.String;

    public bool Multiple => true;

    public int Index => 70;
}