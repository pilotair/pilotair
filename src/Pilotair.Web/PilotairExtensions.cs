using System.IO;
using System.Net.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Pilotair.Application;
using Pilotair.Application.Files;
using Pilotair.Application.Modules;
using Pilotair.Application.Routes;
using Pilotair.Core.CodeGeneration;
using Pilotair.Core.Runtime;
using Pilotair.Core.Runtime.ModuleResolvers;
using Swashbuckle.AspNetCore.Swagger;

namespace Pilotair.Web;

public static class PilotairExtensions
{
    public static IServiceCollection AddPilotair(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddOptions<PilotairOptions>().Bind(configuration.GetSection(PilotairOptions.NAME));
        services.AddRequestJsEngine();
        return services;
    }
    private static IServiceCollection AddRequestJsEngine(this IServiceCollection services)
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

    public static WebApplication UsePilotair(this WebApplication app)
    {
        var options = app.Services.GetRequiredService<IOptions<PilotairOptions>>().Value;
        var routeService = app.Services.GetRequiredService<RouteService>();
        routeService.Init(app);
        app.UseFrontApp();
        var fileStore = app.Services.GetRequiredService<FileStore>();

        app.UseFileServer(new FileServerOptions
        {
            FileProvider = new PhysicalFileProvider(fileStore.Root)
        });

        Console.WriteLine($"Data root path: {options.DataPath}");
        return app;
    }

    private static WebApplication UseFrontApp(this WebApplication app)
    {
        app.UseFileServer(new FileServerOptions
        {
            RequestPath = "/__admin__"
        });

        if (app.Environment.IsDevelopment())
        {
            var swaggerProvider = app.Services.GetRequiredService<ISwaggerProvider>();
            var doc = swaggerProvider.GetSwagger("v1");
            var openApiAdapter = new OpenApiAdapter(doc);
            var schemas = openApiAdapter.Mapping();
            var typescriptConverter = new TypescriptConverter(schemas);
            var result = typescriptConverter.Convert();
            File.WriteAllText("./front-app/src/schema.d.ts", result);
        }

        return app;
    }

}