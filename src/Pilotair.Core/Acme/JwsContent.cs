using System.Net.Http;
using System.Net.Http.Headers;

namespace Pilotair.Core.Acme;

public class JwsContent : StringContent
{
    public JwsContent(object message, string url, string nonce)
        : base(ComputeAcmeSigned(message, url, nonce))
    {
        Headers.ContentType = new MediaTypeHeaderValue("application/jose+json");
    }

    protected static string ComputeAcmeSigned(object message, string url, string nonce, string? kid = null)
    {
        var signer = new JwsSigner();
        return signer.Sign(message, url, nonce, kid);
    }

}