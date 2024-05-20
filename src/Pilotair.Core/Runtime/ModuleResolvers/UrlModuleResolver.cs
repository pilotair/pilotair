using Esprima;
using Jint.Runtime.Modules;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Runtime.ModuleResolvers;

public class HttpModuleResolver(HttpClient httpClient, IUrlModuleCacheStore? store = null) : IModuleResolver
{
    public virtual string Scheme => Uri.UriSchemeHttp;

    public string Load(Jint.Engine engine, Uri uri)
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

    public ModuleResolved? TryResolve(string? referencingModuleLocation, ModuleRequest moduleRequest)
    {
        Uri? uri;
        if (IsUrl(moduleRequest.Specifier))
        {
            uri = new Uri(moduleRequest.Specifier);
        }
        else if (IsUrl(referencingModuleLocation) && PathHelper.IsRelativeOrAbsolute(moduleRequest.Specifier))
        {
            var uriBuilder = new UriBuilder(referencingModuleLocation!);
            uriBuilder.Path = Path.GetFullPath(moduleRequest.Specifier, uriBuilder.Path);
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