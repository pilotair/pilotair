using Microsoft.Extensions.DependencyInjection;
using Pilotair.Core.CodeEngine;
using Pilotair.Core.CodeEngine.ModuleResolvers;

namespace Pilotair.Core;

public static class PilotairExtensions
{
    public static IServiceCollection AddPilotairCodeEngine(this IServiceCollection services)
    {
        services.AddSingleton<IModuleResolver, FileModuleResolver>();
        services.AddSingleton<ModuleLoader>();
        return services;
    }
}