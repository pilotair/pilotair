using Microsoft.Extensions.Localization;

namespace Pilotair.Application.DataModels.Components;

[Singleton(typeof(IComponent))]
public class DateTime(IStringLocalizer t) : IComponent
{
    public string Name => "dateTime";

    public ValueType Type => ValueType.DateTime;

    public bool Multiple => false;

    public int Index => 50;
    public string Display => t["DateTime"];
}