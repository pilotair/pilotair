using Microsoft.Extensions.Localization;

namespace Pilotair.Application.DataModels.Components;

[Singleton(typeof(IComponent))]
public class Content(IStringLocalizer t) : IComponent
{
    public string Name => "content";

    public ValueType Type => ValueType.String;

    public bool Multiple => true;

    public int Index => 80;

    public string Display => t["Content"];
}