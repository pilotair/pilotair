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
        var routeHandlers = app.Services.GetRequiredService<IEnumerable<IRouteHandler>>();
        var routeHandlerMap = routeHandlers.ToDictionary(r => r.Name, r => r);
        var routes = codeService.GetRoutes();

        foreach (var route in routes)
        {
            dataSource.AddEndpoint(
                route.Name,
                 route.Pattern,
                 route.RequestDelegate,
                 route.Order
            );
        }

        dataSource.Reload();

        if (app is IEndpointRouteBuilder routeBuilder)
        {
            routeBuilder.DataSources.Add(dataSource);
        }

        return app;
    }
}