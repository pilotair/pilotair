namespace Pilotair.Application.DataModels.Components;

[Singleton(typeof(IComponent))]
public class DateTime : IComponent
{
    public string Name => "dateTime";

    public ValueType Type => ValueType.DateTime;

    public bool Multiple => false;

    public int Index => 50;
}