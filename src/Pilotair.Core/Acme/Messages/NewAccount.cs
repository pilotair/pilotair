using System.Text.Json.Serialization;

namespace Pilotair.Core.Acme.Messages;

public class NewAccount
{
    [JsonPropertyName("contact")]
    public IEnumerable<string> Contact { get; set; } = [];

    [JsonPropertyName("termsOfServiceAgreed")]
    public bool? TermsOfServiceAgreed { get; set; } = true;

    [JsonPropertyName("onlyReturnExisting")]
    public bool? OnlyReturnExisting { get; set; }
}