using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pilotair.Core.Project;
using Pilotair.Core.Resource;

namespace Pilotair.Core;

public static class PilotairExtension
{
    public static IServiceCollection AddPilotair(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpContextAccessor();
        services.AddSingleton<PilotairData>();
        services.AddSingleton<ProjectService>();
        services.AddScoped<ResourceService>();

        services.AddOptions<PilotairOptions>()
             .Bind(configuration.GetSection(PilotairOptions.NAME));
             
        return services;
    }
}