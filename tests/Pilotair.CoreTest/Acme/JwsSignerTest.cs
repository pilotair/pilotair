using System.Text.Json;
using Pilotair.Core.Acme;

namespace Pilotair.CoreTest.Acme;

[TestClass]
public class JwsSignerTest
{
    [TestMethod]
    public void Export()
    {
        using var originalJwsSigner = new JwsSigner();
        var originalParameters = originalJwsSigner.Export();
        using var copedJwsSigner = new JwsSigner(originalParameters);
        var copyParameters = copedJwsSigner.Export();
        Assert.AreEqual(originalParameters.Curve, copyParameters.Curve);
        Assert.AreEqual(originalParameters.D, copyParameters.D);
        Assert.AreEqual(originalParameters.X, copyParameters.X);
        Assert.AreEqual(originalParameters.Y, copyParameters.Y);
    }

    [TestMethod]
    public void Sign()
    {
        using var originalJwsSigner = new JwsSigner();
        var originalParameters = originalJwsSigner.Export();
        using var copedJwsSigner = new JwsSigner(originalParameters);

        var payload = new
        {
            msg = "Hello"
        };

        var originalSignData = originalJwsSigner.Sign(payload, string.Empty, string.Empty, string.Empty);
        var copySignData = originalJwsSigner.Sign(payload, string.Empty, string.Empty, string.Empty);

        Assert.IsTrue(copedJwsSigner.Valid(originalSignData));
        Assert.IsTrue(originalJwsSigner.Valid(copySignData));
    }
}