using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Pilotair.Core.Services;

namespace Pilotair.Core;

public static class PilotairExtensions
{
    public static IServiceCollection AddPilotairCore(this IServiceCollection services)
    {
        services.AddSingleton(new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            PropertyNameCaseInsensitive = true
        });

        services.AddSingleton<JsonService>();
        return services;
    }
}