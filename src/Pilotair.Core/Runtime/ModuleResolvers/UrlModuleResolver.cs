using System.IO;
using System.Net.Http;
using Esprima;
using Jint;
using Jint.Runtime.Modules;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Runtime.ModuleResolvers;

public class HttpModuleResolver(HttpClient httpClient, IUrlModuleCacheStore? store = null) : IModuleResolver
{
    public virtual string Scheme => Uri.UriSchemeHttp;

    public string Load(Engine engine, Uri uri)
    {
        if (store?.TryGetCode(uri, out string code) ?? false)
        {
            return code;
        }

        var response = httpClient.Send(new HttpRequestMessage(HttpMethod.Get, uri));
        using var stream = response.Content.ReadAsStream();
        using var reader = new StreamReader(stream);
        code = reader.ReadToEnd();
        store?.AddCode(uri, code);
        return code;
    }

    public ModuleResolved? TryResolve(string? reference, string specifier, JsEngine engine)
    {
        Uri? uri;
        if (IsUrl(specifier))
        {
            uri = new Uri(specifier);
        }
        else if (IsUrl(reference) && PathHelper.IsRelativeOrAbsolute(specifier))
        {
            var uriBuilder = new UriBuilder(reference!);
            uriBuilder.Path = Path.GetFullPath(specifier, uriBuilder.Path);
            uri = uriBuilder.Uri;
        }
        else
        {
            return default;
        }

        return new ModuleResolved(uri, SpecifierType.RelativeOrAbsolute);
    }

    private static bool IsUrl(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return false;
        return value.StartsWith("http://", true, default) || value.StartsWith("https://", true, default);
    }
}

public class HttpsModuleResolver(HttpClient httpClient, IUrlModuleCacheStore? store = null) : HttpModuleResolver(httpClient, store)
{
    public override string Scheme => Uri.UriSchemeHttps;
}

public interface IUrlModuleCacheStore
{
    bool TryGetCode(Uri uri, out string code);
    void AddCode(Uri uri, string code);
}