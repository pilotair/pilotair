namespace Pilotair.Web.DataModels;

public class Field
{
    public required string Name { get; init; }
    public string? Display { get; set; }
    public required ControlTypes ControlType { get; set; }
}