using System.Text.Json;
using Pilotair.Core.Acme;

namespace Pilotair.CoreTest.Acme;

[TestClass]
public class JwsSignerTest
{

    [TestMethod]
    public void NewJwk()
    {
        var result = new JwsSigner();
        var parameters= result.Export();
        var json = JsonSerializer.Serialize(result.GetJwk());
    }
}