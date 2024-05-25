using System.Text.Json.Serialization;
using Pilotair.Web.DataModels;

namespace Pilotair.Web.Contents;

public class ContentCollection
{
    public required string Name { get; init; }
    public string? Display { get; set; }
    public required Field[] Fields { get; init; } = [];
}