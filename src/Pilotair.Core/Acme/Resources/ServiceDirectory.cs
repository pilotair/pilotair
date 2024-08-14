namespace Pilotair.Core.Acme.Resources;

public class ServiceDirectory
{
    public required string NewNonce { get; set; } //! = "acme/new-nonce";

    public required string NewAccount { get; set; } //! = "acme/new-acct";

    public required string NewOrder { get; set; } //! = "acme/new-order";

    public required string RevokeCert { get; set; } //! = "acme/revoke-cert";

    public required string KeyChange { get; set; } //! = "acme/key-change";

    public required DirectoryMeta Meta { get; init; }
}

public class DirectoryMeta
{
    public required string TermsOfService { get; init; }

    public required string Website { get; init; }

    public required string[] CaaIdentities { get; init; }
}




