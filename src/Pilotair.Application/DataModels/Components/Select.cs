namespace Pilotair.Application.DataModels.Components;

[Singleton(typeof(IComponent))]
public class Select : IComponent
{
    public string Name => "number";

    public ValueType Type => ValueType.String;

    public bool Multiple => true;

    public int Index => 60;
}