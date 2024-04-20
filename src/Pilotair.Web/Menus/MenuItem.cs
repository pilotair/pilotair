using System.Text.Json.Serialization;

namespace Pilotair.Web;

public class MenuItem
{
    public enum Types
    {
        Unknown,
        Home,
        Files,
        Codes,
        Code,
        CodeFolder
    }
    public required uint Order { get; init; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public required Types Type { get; set; }

    public required string Name { get; init; }

    public IEnumerable<MenuItem>? Children { get; set; }
}