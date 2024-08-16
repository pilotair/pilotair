using Pilotair.Core.Acme;

namespace Pilotair.CoreTest.Acme;

[TestClass]
public class AcmeClientTest
{
    private readonly string testParameters = "{\"curve\":\"nistP256\",\"d\":\"vCCzwulFeS6jh6oVBQrqyGn-7whBWwn6Ce_v3fWdW38\",\"x\":\"lPiqsB-OosrGg7FCsgVVjvzCSOgBC6Ckax9ZCyL74xA\",\"y\":\"8jhbrDP6aaWezMRzPv0xd3Ayl_QmtxK5QDfQSTpWTYc\"}";

    [TestMethod]
    public async Task ExportJwsSignerParametersAsync()
    {
        var client = await CreateClientAsync(testParameters);
        var parameters = client.ExportJwsSignerParameters();
        Assert.AreEqual(parameters, testParameters);
    }

    [TestMethod]
    public async Task NewAccountAsync()
    {
        var client = await CreateClientAsync(testParameters);
        //https://acme-v02.api.letsencrypt.org/acme/acct/1893629016
        var kid = await client.NewAccount(new Core.Acme.Messages.NewAccount
        {
            OnlyReturnExisting = true,
            TermsOfServiceAgreed = true
        });
    }

    private async Task<AcmeClient> CreateClientAsync(string? jwsSignerParameters = null)
    {
        var client = new AcmeClient(new HttpClient(), new ClientOptions
        {
            Staging = true,
            JwsSignerParameters = jwsSignerParameters
        });

        await client.InitAsync();
        return client;
    }
}