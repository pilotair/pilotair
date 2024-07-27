namespace Pilotair.Application.DataModels.Components;

[Singleton(typeof(IComponent))]
public class Number : IComponent
{
    public string Name => "number";

    public ValueType Type => ValueType.Number;

    public bool Multiple => false;

    public int Index => 40;
}