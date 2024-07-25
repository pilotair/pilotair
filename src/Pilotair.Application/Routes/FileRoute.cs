using Microsoft.AspNetCore.Http;

namespace Pilotair.Application.Routes;

public class FileRoute(Core.Stores.Files.File file, IRouteHandler handler)
{
    public string Name => file.RelationPath;
    public int Order => handler.Order;
    public string Pattern => "/" + Path.GetDirectoryName(file.RelationPath);
    public async Task RequestDelegate(HttpContext context)
    {
        await handler.HandleAsync(context, file);
    }
}