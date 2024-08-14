using Pilotair.Core.Acme;

namespace Pilotair.CoreTest.Acme;

[TestClass]
public class AcmeClientTest
{

    [TestMethod]
    public async Task InitAsync()
    {
        var client = new AcmeClient(new HttpClient(), new ClientOptions
        {
            Staging = true
        });
        await client.InitAsync();
    }

    [TestMethod]
    public async Task NewAccountAsync()
    {
        var client = new AcmeClient(new HttpClient(), new ClientOptions
        {
            Staging = true
        });
        await client.InitAsync();
        //"https://acme-staging-v02.api.letsencrypt.org/acme/acct/159392513"
        var kid = await client.NewAccount(new Core.Acme.Messages.NewAccount
        {
            OnlyReturnExisting = false,
            TermsOfServiceAgreed = true
        });
    }
}