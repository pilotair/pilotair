using Pilotair.Web.Endpoint;

namespace Pilotair.Web.Codes;

public static class PilotairExtensions
{
    public static IServiceCollection AddCodesRouting(this IServiceCollection services)
    {
        services.AddSingleton<CodeEndpointDataSource>();
        return services;
    }

    public static WebApplication UseCodesRouting(this WebApplication app)
    {
        var dataSource = app.Services.GetRequiredService<CodeEndpointDataSource>();
        var codeService = app.Services.GetRequiredService<CodeService>();
        var codes = codeService.GetRoutes();

        foreach (var code in codes)
        {
            var pattern = "/" + Path.GetDirectoryName(code.RelationPath);
            var context = new RouteContext(code);
            dataSource.AddEndpoint(code.RelationPath, pattern, context.HandleAsync);
        }

        dataSource.Reload();

        if (app is IEndpointRouteBuilder routeBuilder)
        {
            routeBuilder.DataSources.Add(dataSource);
        }

        return app;
    }


}