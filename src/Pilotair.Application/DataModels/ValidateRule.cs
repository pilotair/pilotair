namespace Pilotair.Application.DataModels;

public class ValidateRule
{
    public bool? Required { get; set; }
    public string[]? Enum { get; set; }
    public long? Length { get; set; }
    public long? Max { get; set; }
    public long? Min { get; set; }
    public string? Pattern { get; set; }
    public string? Message { get; set; }
}