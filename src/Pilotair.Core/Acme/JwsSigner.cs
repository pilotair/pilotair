using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.IdentityModel.Tokens;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Acme;

public class JwsSigner : IDisposable
{
    public record Parameters(string Curve, string D, string X, string Y);
    public record Jwk(string Crv, string Kty, string X, string Y);

    private readonly ECDsa ecdsa = ECDsa.Create(ECCurve.NamedCurves.nistP256);

    public JwsSigner(Parameters? parameters = null)
    {
        if (parameters == null) return;

        var ecParameters = new ECParameters
        {
            Curve = ECCurve.CreateFromFriendlyName(parameters.Curve),
            Q = new ECPoint
            {
                X = Convert.FromBase64String(parameters.X),
                Y = Convert.FromBase64String(parameters.Y)
            },
            D = Convert.FromBase64String(parameters.D)
        };

        ecdsa.ImportParameters(ecParameters);
    }

    public Parameters Export()
    {
        var parameters = ecdsa.ExportParameters(includePrivateParameters: true);

        return new Parameters(
            parameters.Curve.Oid.FriendlyName!,
            Base64UrlEncoder.Encode(parameters.D),
            Base64UrlEncoder.Encode(parameters.Q.X),
            Base64UrlEncoder.Encode(parameters.Q.Y)
        );
    }

    public Jwk GetJwk()
    {
        var parameters = ecdsa.ExportParameters(includePrivateParameters: false);

        return new Jwk(
            JsonWebKeyECTypes.P256,
            JsonWebAlgorithmsKeyTypes.EllipticCurve,
            Base64UrlEncoder.Encode(parameters.Q.X),
            Base64UrlEncoder.Encode(parameters.Q.Y)
        );
    }

    public string Sign(object message, string url, string nonce, string? kid = null)
    {
        var payload = message == null ? string.Empty : Base64UrlEncoder.Encode(JsonHelper.Serialize(message));

        var @protected = new Dictionary<string, object>
        {
            ["alg"] = "ES256",
            ["url"] = url,
            ["nonce"] = nonce
        };

        if (kid != null)
        {
            @protected["kid"] = kid;
        }
        else
        {
            @protected["jwk"] = GetJwk();
        }

        var protectedBase64 = Base64UrlEncoder.Encode(JsonHelper.Serialize(@protected));

        var signingInput = $"{protectedBase64}.{payload}";
        var signingBytes = Encoding.ASCII.GetBytes(signingInput);
        var sigBytes = ecdsa.SignData(signingBytes, HashAlgorithmName.SHA256);
        var signBase64 = Base64UrlEncoder.Encode(sigBytes);

        var result = new
        {
            Protected = protectedBase64,
            Payload = payload,
            Signature = signBase64
        };

        return JsonHelper.Serialize(result);
    }

    public void Dispose()
    {
        ecdsa.Dispose();
    }
}