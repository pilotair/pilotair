using Jint;
using Jint.Native;

namespace Pilotair.Web.Codes;

public interface IRouteHandler
{
    string Name { get; }
    int Order { get; }

    Task HandleAsync(HttpContext context, File file);
}