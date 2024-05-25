namespace Pilotair.Web.DataModels;

public class Field
{
    public required string Name { get; init; }
    public string? Display { get; set; }
    public required ControlTypes ControlType { get; set; }
    public bool IsArray { get; set; } = false;
    public string? Collection { get; set; }
    public Dictionary<string, string>? Options { get; set; }
}