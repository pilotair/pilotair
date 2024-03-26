using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pilotair.Core.Code;
using Pilotair.Core.Code.ModuleResolvers;
using Pilotair.Core.Project;

namespace Pilotair.Core;

public static class PilotairExtensions
{
    public static IServiceCollection AddPilotairCore(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IModuleResolver, FileModuleResolver>();
        services.AddSingleton<ModuleLoader>();
        services.AddOptions<PilotairOptions>().Bind(configuration.GetSection(PilotairOptions.NAME));
        return services;
    }
}