// using Microsoft.Extensions.Options;
// using Pilotair.Web.Bindings;

// namespace Pilotair.Web.Projects;

// [Scoped]
// public class ProjectContext
// {
//     private string? path;

//     public ProjectContext(IHttpContextAccessor contextAccessor, BindingService bindingService,
//     ProjectService projectService, IOptions<PilotairOptions> options)
//     {
//         if (contextAccessor.HttpContext == default) return;
//         var host = contextAccessor.HttpContext.Request.Host.Value;
//         var name = bindingService.Match(host) ?? "www";
//         Project = projectService.Get(name);
//     }

//     public string? Path
//     {
//         get
//         {
//             if (Project != default)
//             {
//                 return Project.Path;
//             }
//             return path;
//         }
//         set => path = value;
//     }

//     public Project? Project { get; set; }
// }