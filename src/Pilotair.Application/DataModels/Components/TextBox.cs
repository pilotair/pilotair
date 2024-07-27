namespace Pilotair.Application.DataModels.Components;

[Singleton(typeof(IComponent))]
public class TextBox : IComponent
{
    public string Name => "textBox";

    public ValueType Type => ValueType.String;

    public bool Multiple => false;

    public int Index => 1;
}