namespace Pilotair.Web;

public class MenuItem
{
    public required uint Order { get; init; }

    public required string Label { get; init; } = string.Empty;
    public string Icon { get; set; } = string.Empty;

    public MenuItem[]? Children { get; set; }
}