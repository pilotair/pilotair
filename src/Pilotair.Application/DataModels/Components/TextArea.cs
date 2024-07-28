namespace Pilotair.Application.DataModels.Components;

[Singleton(typeof(IComponent))]
public class TextArea : IComponent
{
    public string Name => "textArea";

    public ValueType Type => ValueType.String;

    public bool Multiple => false;

    public int Index => 10;
    public string Display => "TextArea";
}