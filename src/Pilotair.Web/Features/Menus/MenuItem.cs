using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Pilotair.Web;

public class MenuItem
{
    public enum Types
    {
        Unknown,
        Features,
        Files,
        Codes,
        Code,
        CodeFolder,
        Contents,
        Options,
    }
    public required uint Order { get; init; }

    public required Types Type { get; set; }

    [Required]
    public required string Name { get; init; }

    public IEnumerable<MenuItem>? Children { get; set; }
}