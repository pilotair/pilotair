using System.Text.Json.Serialization;

namespace Pilotair.Core.Acme.Messages;
public class CheckAccount
{
    [JsonPropertyName("onlyReturnExisting")]
    public bool OnlyReturnExisting { get; } = true;
}