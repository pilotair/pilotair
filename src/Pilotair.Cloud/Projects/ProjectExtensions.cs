// using System.IO;
// using Microsoft.AspNetCore.Routing;
// using Microsoft.Extensions.Options;
// using Pilotair.Core.Helpers;

// namespace Pilotair.Web.Projects;

// public static class ProjectExtensions
// {
//     public static IEndpointRouteBuilder UseProjects(this IEndpointRouteBuilder routeBuilder)
//     {
//         var options = routeBuilder.ServiceProvider.GetRequiredService<IOptions<PilotairOptions>>().Value;
//         var services = routeBuilder.ServiceProvider.GetRequiredService<IServiceScopeFactory>();
//         var projectsPath = Path.Combine(options.DataPath, Constants.PROJECTS_FOLDER);
//         IoHelper.EnsureDirectoryExist(projectsPath);
//         var paths = Directory.GetDirectories(projectsPath);

//         foreach (var path in paths)
//         {
//             using var scope = services.CreateScope();
//             var projectContext = scope.ServiceProvider.GetRequiredService<ProjectContext>();
//             projectContext.Path = path;
//             var projectService = routeBuilder.ServiceProvider.GetRequiredService<ProjectService>();
//             var project = projectService.Load(path, scope);
//             routeBuilder.DataSources.Add(project.Endpoints);
//             project.Endpoints.Reload();
//         }

//         return routeBuilder;
//     }
// }