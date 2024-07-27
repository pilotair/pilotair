namespace Pilotair.Application.DataModels;

public class ValidateRule
{
    public ValidateType Type { get; set; }
    public object? Value { get; set; }
    public string? Message { get; set; }
}