namespace Pilotair.Core.Acme;

public class ClientOptions
{
    public bool Staging { get; set; } = false;
    public string? JwsSignerParameters { get; set; }
}