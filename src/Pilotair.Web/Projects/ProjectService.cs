using System.Collections.Concurrent;
using Microsoft.Extensions.Options;
using Pilotair.Web.Codes;

namespace Pilotair.Web.Projects;

[Singleton]
public class ProjectService(
    IOptions<PilotairOptions> options,
    IEnumerable<Codes.IRouteHandler> routeHandlers
    )
{
    private readonly ConcurrentDictionary<string, Project> projects = [];

    public Project Load(string path, IServiceScope scope)
    {
        var endpoints = new ProjectEndpointDataSource();
        var codeService = scope.ServiceProvider.GetRequiredService<CodeService>();
        var routeHandlerMap = routeHandlers.ToDictionary(r => r.Name, r => r);
        var routes = codeService.GetRoutes();

        foreach (var route in routes)
        {
            endpoints.AddEndpoint(
                route.Name,
                 route.Pattern,
                 route.RequestDelegate,
                 route.Order
            );
        }

        var project = new Project
        {
            Path = path,
            Name = Path.GetFileName(path),
            Endpoints = endpoints
        };

        projects.TryAdd(project.Name, project);
        return project;
    }

    public Project Create(string name)
    {
        var endpoints = new ProjectEndpointDataSource();

        var project = new Project
        {
            Path = options.Value.DataPath,
            Name = name,
            Endpoints = endpoints
        };

        return project;
    }
}