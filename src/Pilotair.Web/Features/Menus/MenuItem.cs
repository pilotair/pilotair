using System.ComponentModel.DataAnnotations;

namespace Pilotair.Web;

public class MenuItem
{
    public enum Types
    {
        Unknown,
        Files,
        Codes,
        Code,
        CodeFolder,
        Contents,
        Options,
    }
    public uint Order { get; set; }

    public required Types Type { get; set; }

    public required string Name { get; init; }
    [Required]
    public string Path { get; init; } = string.Empty;

    public IEnumerable<MenuItem>? Children { get; set; }
}