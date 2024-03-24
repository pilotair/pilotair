using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pilotair.Core.Project;

namespace Pilotair.Core;

public static class PilotairExtensions
{
    public static IServiceCollection AddPilotairCore(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddOptions<PilotairOptions>().Bind(configuration.GetSection(PilotairOptions.NAME));
        services.AddSingleton<ProjectService>();
        return services;
    }
}