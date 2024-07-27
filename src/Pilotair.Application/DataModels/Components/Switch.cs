namespace Pilotair.Application.DataModels.Components;

[Singleton(typeof(IComponent))]
public class Switch : IComponent
{
    public string Name => "switch";

    public ValueType Type => ValueType.Boolean;

    public bool Multiple => false;

    public int Index => 30;
}