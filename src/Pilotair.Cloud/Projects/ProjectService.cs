// using System.Collections.Concurrent;
// using System.IO;
// using Microsoft.Extensions.Options;
// using Pilotair.Web.Bindings;
// using Pilotair.Web.Codes;
// using Pilotair.Web.Routes;

// namespace Pilotair.Web.Projects;

// [Singleton]
// public class ProjectService(
//     IEnumerable<IRouteHandler> routeHandlers,
//     PilotairStore pilotairStore,
//     IOptions<PilotairOptions> options
//     )
// {
//     private readonly ConcurrentDictionary<string, Project> projects = [];

//     public Project Load(string path, IServiceScope scope)
//     {
//         var endpoints = new EndpointDataSource();
//         var codeService = scope.ServiceProvider.GetRequiredService<CodeService>();
//         var routeHandlerMap = routeHandlers.ToDictionary(r => r.Name, r => r);
//         var routes = codeService.GetRoutes();

//         foreach (var route in routes)
//         {
//             endpoints.AddEndpoint(
//                 route.Name,
//                  route.Pattern,
//                  route.RequestDelegate,
//                  route.Order
//             );
//         }

//         var project = new Project
//         {
//             Path = path,
//             Name = Path.GetFileName(path),
//             Endpoints = endpoints
//         };

//         projects.TryAdd(project.Name, project);

//         return project;
//     }

//     public async Task<Project> CreateAsync(string name, string host)
//     {
//         var endpoints = new EndpointDataSource();

//         var project = new Project
//         {
//             Path = name,
//             Name = name,
//             Endpoints = endpoints
//         };

//         var projectPath = Path.Combine(options.Value.DataPath, Constants.PROJECTS_FOLDER, project.Name);
//         Directory.CreateDirectory(projectPath);
//         projects.TryAdd(project.Name, project);
//         await pilotairStore.Binding.AddDocumentAsync(new Binding
//         {
//             Host = host,
//             Project = project.Name
//         });

//         return project;
//     }

//     public Project? Get(string name)
//     {
//         if (projects.TryGetValue(name, out var project))
//         {
//             return project;
//         }

//         return null;
//     }

//     public async Task<IEnumerable<ProjectModel>> ListAsync()
//     {
//         var result = new List<ProjectModel>();

//         foreach (var project in projects.Values)
//         {
//             var binding = await pilotairStore.Binding.Query.Where("$.project", project.Name).FirstOrDefaultAsync();
//             var model = new ProjectModel(project, binding?.Data);
//             result.Add(model);
//         }

//         return result;
//     }

//     internal Task DeleteAsync(string name)
//     {
//         throw new NotImplementedException();
//         // if (projects.TryRemove(name, out var project))
//         // {

//         // }
//     }
// }