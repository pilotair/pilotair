using System.Security.Cryptography;
using System.Text;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Acme;

public class JwsSigner : IDisposable
{
    public record Parameters(string Curve, string D, string X, string Y);
    public record JsonWebKey(string Crv, string Kty, string X, string Y);
    public record JsonWebSignature(string Protected, string Payload, string Signature);

    private readonly ECDsa ecdsa = ECDsa.Create(ECCurve.NamedCurves.nistP256);

    public JwsSigner(Parameters? parameters = null)
    {
        if (parameters == null) return;

        var ecParameters = new ECParameters
        {
            Curve = ECCurve.CreateFromFriendlyName(parameters.Curve),
            Q = new ECPoint
            {
                X = Base64UrlHelper.DecodeBytes(parameters.X),
                Y = Base64UrlHelper.DecodeBytes(parameters.Y)
            },
            D = Base64UrlHelper.DecodeBytes(parameters.D)
        };

        ecdsa.ImportParameters(ecParameters);
    }

    public Parameters Export()
    {
        var parameters = ecdsa.ExportParameters(includePrivateParameters: true);

        return new Parameters(
            parameters.Curve.Oid.FriendlyName!,
            Base64UrlHelper.Encode(parameters.D),
            Base64UrlHelper.Encode(parameters.Q.X),
            Base64UrlHelper.Encode(parameters.Q.Y)
        );
    }

    public JsonWebSignature Sign(object? message, string url, string nonce, string? kid = null)
    {
        var payload = Base64UrlHelper.EncodeObject(message);
        var @protected = BuildHeader(url, nonce, kid);

        var body = $"{@protected}.{payload}";
        var bodyBytes = Encoding.ASCII.GetBytes(body);
        var signatureBytes = ecdsa.SignData(bodyBytes, HashAlgorithmName.SHA256);
        var signature = Base64UrlHelper.Encode(signatureBytes);
        return new JsonWebSignature(@protected, payload, signature);
    }

    public bool Valid(JsonWebSignature jws)
    {
        var body = $"{jws.Protected}.{jws.Payload}";
        var bodyBytes = Encoding.ASCII.GetBytes(body);
        return ecdsa.VerifyData(bodyBytes, Base64UrlHelper.DecodeBytes(jws.Signature), HashAlgorithmName.SHA256);
    }

    public void Dispose()
    {
        ecdsa.Dispose();
    }

    private JsonWebKey GetJwk()
    {
        var parameters = ecdsa.ExportParameters(includePrivateParameters: false);

        return new JsonWebKey(
            "P-256",
            "EC",
            Base64UrlHelper.Encode(parameters.Q.X),
            Base64UrlHelper.Encode(parameters.Q.Y)
        );
    }

    private string BuildHeader(string url, string nonce, string? kid = null)
    {
        var header = new Dictionary<string, object>
        {
            ["alg"] = "ES256",
            ["url"] = url,
            ["nonce"] = nonce
        };

        if (kid != null)
        {
            header["kid"] = kid;
        }
        else
        {
            header["jwk"] = GetJwk();
        }

        return Base64UrlHelper.EncodeObject(header);
    }
}