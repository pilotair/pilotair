namespace Pilotair.Core.CodeGeneration;

public class Schema
{
    public record Property(string Name, string Type);
    public record Param(string Name, string Type);
    public record Method(string Name, Param[] Params, string ReturnType);

    public string Namespace { get; set; } = string.Empty;
    public required string Name { get; set; }
    public IEnumerable<Property> Properties { get; set; } = [];
    public IEnumerable<Method> Methods { get; set; } = [];


}