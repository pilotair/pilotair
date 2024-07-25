using Jint;
using Jint.Runtime.Modules;
using Microsoft.AspNetCore.Http;
using Pilotair.Application.Modules.Http;
using Pilotair.Core.Runtime;

namespace Pilotair.Application.Modules;

[Singleton]
public class BuiltInModuleResolver(IHttpContextAccessor httpContextAccessor) : IModuleResolver
{
    public string Scheme => "pilotair";

    public string Load(Engine engine, Uri uri)
    {
        throw new ModuleNotFoundException();
    }
    public ModuleResolved? TryResolve(string? reference, string specifier, JsEngine engine)
    {
        if (!specifier.StartsWith(Scheme + ':', true, null)) return null;
        var uriBuilder = new UriBuilder
        {
            Scheme = Scheme,
            Host = specifier[(Scheme.Length + 1)..]
        };

        if (httpContextAccessor.HttpContext == default) return null;

        engine.AddModule(uriBuilder.Uri, builder =>
        {
            builder.ExportObject("request", new Request(httpContextAccessor));
            builder.ExportType<TextResponse>();
            builder.ExportType<JsonResponse>();
        });

        return new ModuleResolved(uriBuilder.Uri, SpecifierType.Bare);
    }
}