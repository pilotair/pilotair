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
    public uint Order { get; set; }

    public required Types Type { get; set; }

    public required string Name { get; init; }

    public IEnumerable<MenuItem>? Children { get; set; }
}