namespace Pilotair.Application.DataModels.Components;

[Singleton(typeof(IComponent))]
public class Content : IComponent
{
    public string Name => "content";

    public ValueType Type => ValueType.String;

    public bool Multiple => true;

    public int Index => 80;
}