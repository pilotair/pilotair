using Microsoft.AspNetCore.Http;

namespace Pilotair.Application.Routes;

public interface IRouteHandler
{
    string Name { get; }
    int Order { get; }

    Task HandleAsync(HttpContext context, Core.Stores.Files.File file);
}