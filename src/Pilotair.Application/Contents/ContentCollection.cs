using Pilotair.Application.DataModels;

namespace Pilotair.Application.Contents;

public class ContentCollection
{
    public string? Display { get; set; }
    public required Field[] Fields { get; init; } = [];
}