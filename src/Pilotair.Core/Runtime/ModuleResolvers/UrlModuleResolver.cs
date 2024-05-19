using Esprima;
using Jint.Runtime.Modules;

namespace Pilotair.Core.Runtime.ModuleResolvers;

public class HttpModuleResolver(HttpClient httpClient) : IModuleResolver
{
    public virtual string Scheme => Uri.UriSchemeHttp;

    public bool IsMatch(string specifier)
    {
        return specifier.StartsWith($"{Scheme}://", true, null);
    }

    public Module Load(Jint.Engine engine, ResolvedSpecifier resolved)
    {
        if (resolved.Uri == default) throw new ModuleNotFoundException();
        var response = httpClient.Send(new HttpRequestMessage(HttpMethod.Get, resolved.Uri));
        using var stream = response.Content.ReadAsStream();
        using var reader = new StreamReader(stream);
        var javaScriptParser = new JavaScriptParser();
        var code = reader.ReadToEnd();

        if (Path.GetExtension(resolved.Uri.AbsolutePath) == ".tsx")
        {
            code = Esbuild.Bundler.Transform(code, new Esbuild.TransformOptions
            {
                Loader = Esbuild.Loader.Tsx
            });
        }

        var module = javaScriptParser.ParseModule(code, resolved.Uri.AbsolutePath);
        return ModuleFactory.BuildSourceTextModule(engine, module);
    }

    public ResolvedSpecifier Resolved(string? referencingModuleLocation, ModuleRequest moduleRequest)
    {
        var uri = new Uri(moduleRequest.Specifier);
        return new ResolvedSpecifier(moduleRequest, uri.ToString(), uri, SpecifierType.RelativeOrAbsolute);
    }
}

public class HttpsModuleResolver(HttpClient httpClient) : HttpModuleResolver(httpClient)
{
    public override string Scheme => Uri.UriSchemeHttps;
}