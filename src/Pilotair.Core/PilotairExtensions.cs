using Microsoft.Extensions.DependencyInjection;
using Pilotair.Core.Runtime;
using Pilotair.Core.Runtime.ModuleResolvers;

namespace Pilotair.Core;

public static class PilotairExtensions
{
    public static IServiceCollection AddPilotairEngine(this IServiceCollection services)
    {
        services.AddSingleton<IModuleResolver, FileModuleResolver>();
        services.AddSingleton<ModuleLoader>();
        return services;
    }
}