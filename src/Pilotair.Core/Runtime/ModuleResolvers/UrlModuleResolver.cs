using Esprima;
using Jint.Runtime.Modules;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Runtime.ModuleResolvers;

public class HttpModuleResolver(HttpClient httpClient) : IModuleResolver
{
    public virtual string Scheme => Uri.UriSchemeHttp;

    public string Load(Jint.Engine engine, ResolvedSpecifier resolved)
    {
        if (resolved.Uri == default) throw new ModuleNotFoundException();
        var response = httpClient.Send(new HttpRequestMessage(HttpMethod.Get, resolved.Uri));
        using var stream = response.Content.ReadAsStream();
        using var reader = new StreamReader(stream);
        var code = reader.ReadToEnd();
        return code;
    }

    public ResolvedSpecifier? TryResolve(string? referencingModuleLocation, ModuleRequest moduleRequest)
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

        return new ResolvedSpecifier(moduleRequest, uri.ToString(), uri, SpecifierType.RelativeOrAbsolute);
    }

    private static bool IsUrl(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return false;
        return value.StartsWith("http://", true, default) || value.StartsWith("https://", true, default);
    }
}

public class HttpsModuleResolver(HttpClient httpClient) : HttpModuleResolver(httpClient)
{
    public override string Scheme => Uri.UriSchemeHttps;
}