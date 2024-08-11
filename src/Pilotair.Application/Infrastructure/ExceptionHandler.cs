using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Pilotair.Core;

namespace Pilotair.Application;

public class ExceptionHandler : IExceptionHandler
{
    public ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        if (exception is PilotairException)
        {
            httpContext.Response.StatusCode = 400;
            httpContext.Response.WriteAsJsonAsync(exception.Message);
        }
        else
        {
            httpContext.Response.StatusCode = 500;
            httpContext.Response.WriteAsJsonAsync("Server error");
        }

        return ValueTask.FromResult(true);
    }
}