using System.ComponentModel.DataAnnotations;

namespace Pilotair.Application.Contents;

public class ContentCollectionModel : ContentCollection
{
    [RegularExpression("^[a-zA-Z_][a-zA-Z0-9_]{0,63}$")]
    public required string Name { get; init; }
}