using Microsoft.AspNetCore.Routing;
using Pilotair.Application.Codes;

namespace Pilotair.Application.Routes;

[Singleton]
public class RouteService(CodeService codeService, EndpointDataSource endpointDataSource)
{
    public void Init(IEndpointRouteBuilder endpointRouteBuilder)
    {
        if (endpointRouteBuilder.DataSources.Contains(endpointDataSource)) return;
        endpointRouteBuilder.DataSources.Add(endpointDataSource);
        var routes = codeService.GetRoutes();
        foreach (var item in routes)
        {
            endpointDataSource.AddEndpoint(item.Name, item.Pattern, item.RequestDelegate, item.Order);
        }
        endpointDataSource.Reload();
    }
}