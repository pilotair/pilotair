using Microsoft.Extensions.Options;
using Pilotair.Core.Helpers;
using Pilotair.Web.Bindings;

namespace Pilotair.Web.Projects;

public static class ProjectExtensions
{
    public static async Task<IEndpointRouteBuilder> UseProjectsAsync(this IEndpointRouteBuilder routeBuilder)
    {
        var options = routeBuilder.ServiceProvider.GetRequiredService<IOptions<PilotairOptions>>().Value;
        var services = routeBuilder.ServiceProvider.GetRequiredService<IServiceScopeFactory>();
        var bindingService = routeBuilder.ServiceProvider.GetRequiredService<BindingService>();
        var projectsPath = Path.Combine(options.DataPath, Constants.PROJECTS_FOLDER);
        IoHelper.EnsureDirectoryExist(projectsPath);
        var paths = Directory.GetDirectories(projectsPath);

        if (paths.Length == 0)
        {
            var path = Path.Combine(projectsPath, "www");
            Directory.CreateDirectory(path);
            paths = [path];
            var exist = await bindingService.GetAsync("www", "*");
            if (exist == default) await bindingService.AddAsync("www", "*");
        }

        foreach (var path in paths)
        {
            using var scope = services.CreateScope();
            var projectContext = scope.ServiceProvider.GetRequiredService<ProjectContext>();
            projectContext.Path = path;
            var projectService = routeBuilder.ServiceProvider.GetRequiredService<ProjectService>();
            var project = projectService.Load(path, scope);
            routeBuilder.DataSources.Add(project.Endpoints);
            project.Endpoints.Reload();
        }

        return routeBuilder;
    }
}