using System.IO;
using System.Net.Http;
using Microsoft.Extensions.Options;
using Pilotair.Core.Runtime;
using Pilotair.Core.Runtime.ModuleResolvers;
using Pilotair.Web.Modules;

namespace Pilotair.Web;

public static class JsEngineExtensions
{
    public static IServiceCollection AddRequestJsEngine(this IServiceCollection services)
    {
        services.AddScoped<JsEngine>();
        services.AddSingleton(serviceProvider =>
        {
            var options = serviceProvider.GetRequiredService<IOptions<PilotairOptions>>().Value;
            var httpClientFactory = serviceProvider.GetRequiredService<IHttpClientFactory>();
            var moduleCacheStore = serviceProvider.GetRequiredService<IUrlModuleCacheStore>();
            var builtInModuleResolver = serviceProvider.GetRequiredService<BuiltInModuleResolver>();
            var httpClient = httpClientFactory.CreateClient();

            return new EngineOptions
            {
                RootPath = Path.Combine(options.DataPath, Constants.CODES_FOLDER),
                ModuleResolvers = [
                    new HttpModuleResolver(httpClient, moduleCacheStore),
                    new HttpsModuleResolver(httpClient, moduleCacheStore),
                    builtInModuleResolver
                ],
                ModuleTransformers = [new TsxModuleTransformer()]
            };
        });

        return services;
    }
}