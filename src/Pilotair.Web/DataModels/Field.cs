namespace Pilotair.Web.DataModels;

public class Field
{
    public required string Name { get; init; }
    public string? Display { get; set; }
    public required ControlTypes ControlType { get; set; }
    public bool Multiple { get; set; } = false;
    public string? Collection { get; set; }
    public KeyValuePair<string, string>[]? Options { get; set; }
    public object? DefaultValue { get; set; }
    public ValidateRule[]? ValidateRules { get; set; }
}