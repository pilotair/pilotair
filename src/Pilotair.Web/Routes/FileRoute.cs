using Pilotair.Core.Stores.Files;

namespace Pilotair.Web.Routes;

public class FileRoute(File file, IRouteHandler handler)
{
    public string Name => file.RelationPath;
    public int Order => handler.Order;
    public string Pattern => "/" + System.IO.Path.GetDirectoryName(file.RelationPath);
    public async Task RequestDelegate(HttpContext context)
    {
        await handler.HandleAsync(context, file);
    }
}