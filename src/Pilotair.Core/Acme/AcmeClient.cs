using System.Collections.Concurrent;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Pilotair.Core.Acme.Messages;
using Pilotair.Core.Acme.Resources;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Acme;

public class AcmeClient
{
    private readonly HttpClient httpClient;
    private readonly ConcurrentQueue<string> nonceQueue = [];
    private ServiceDirectory? directory;
    private record ErrorMessage(string Type, string Detail);
    private readonly JwsSigner signer;

    private ServiceDirectory Directory
    {
        get
        {
            if (directory == null) throw new AcmeException("Acme client not init uninitialized");
            return directory;
        }
    }

    public AcmeClient(HttpClient httpClient, ClientOptions? options = null)
    {
        options ??= new ClientOptions();
        var baseUrl = options.Staging ? Constants.LetsEncryptV2StagingEndpoint : Constants.LetsEncryptV2Endpoint;
        httpClient.BaseAddress = new Uri(baseUrl);
        this.httpClient = httpClient;

        if (!string.IsNullOrWhiteSpace(options.JwsSignerParameters))
        {
            var ecParameters = JsonHelper.Deserialize<JwsSigner.Parameters>(options.JwsSignerParameters);
            signer = new JwsSigner(ecParameters);
        }
        else signer = new JwsSigner();
    }

    public async Task InitAsync()
    {
        directory = await httpClient.GetFromJsonAsync<ServiceDirectory>("directory")
            ?? throw new AcmeException("Directory init failed");
        await NewNonceAsync();
    }

    public string ExportJwsSignerParameters()
    {
        var ecParameters = signer.Export();
        return JsonHelper.Serialize(ecParameters);
    }

    public async Task<string> NewAccount(NewAccount account)
    {
        var response = await SendAsync(Directory.NewAccount, account);
        var kid = (response.Headers.Location?.ToString()) ?? throw new AcmeException("Kid not found");
        return kid;
    }

    public async Task<string> GetAccount()
    {
        var response = await SendAsync(Directory.NewAccount, new CheckAccount());
        var kid = (response.Headers.Location?.ToString()) ?? throw new AcmeException("Kid not found");
        return kid;
    }

    private async Task<HttpResponseMessage> SendAsync(string url, object message)
    {
        var nonce = await GetNonceAsync();
        var jws = signer.Sign(message, url, nonce);
        var content = JsonContent.Create(jws);
        content.Headers.ContentType = new MediaTypeHeaderValue("application/jose+json");
        var response = await httpClient.PostAsync(url, content);
        ExtractNonce(response);
        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadFromJsonAsync<ErrorMessage>();
            throw new AcmeException(error?.Detail);
        }

        return response;
    }

    private async Task<string> GetNonceAsync()
    {
        if (nonceQueue.TryDequeue(out var nonce))
        {
            return nonce!;
        }

        return await NewNonceAsync();
    }

    private async Task<string> NewNonceAsync()
    {
        var response = await httpClient.GetAsync(Directory.NewNonce);
        if (TryExtractNonce(response, out var nonce))
        {
            return nonce;
        }

        throw new AcmeException("Get nonce failed");
    }

    private void ExtractNonce(HttpResponseMessage response)
    {
        if (TryExtractNonce(response, out var nonce))
        {
            nonceQueue.Enqueue(nonce);
        }
    }

    private static bool TryExtractNonce(HttpResponseMessage response, out string nonce)
    {
        var values = response.Headers.GetValues(Constants.ReplayNonceHeaderName);
        nonce = values?.FirstOrDefault() ?? string.Empty;
        return !string.IsNullOrWhiteSpace(nonce);
    }
}