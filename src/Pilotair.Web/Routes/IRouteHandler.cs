using Microsoft.AspNetCore.Http;
using Pilotair.Core.Stores.Files;

namespace Pilotair.Web.Routes;

public interface IRouteHandler
{
    string Name { get; }
    int Order { get; }

    Task HandleAsync(HttpContext context, File file);
}