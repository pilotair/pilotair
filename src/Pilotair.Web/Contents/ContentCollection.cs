using System.Text.Json.Serialization;
using Pilotair.Web.DataModels;

namespace Pilotair.Web.Contents;

public class ContentCollection
{
    public string? Display { get; set; }
    public required Field[] Fields { get; init; } = [];
}