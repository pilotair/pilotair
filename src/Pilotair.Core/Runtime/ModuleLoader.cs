using Jint;
using Jint.Runtime.Modules;

namespace Pilotair.Core.Runtime;

public class ModuleLoader(IEnumerable<IModuleResolver> moduleResolvers) : IModuleLoader
{
    public Module LoadModule(Engine engine, ResolvedSpecifier resolved)
    {
        foreach (var moduleResolver in moduleResolvers)
        {
            var isMatch = moduleResolver.Scheme == resolved.Uri?.Scheme;
            if (isMatch)
            {
                return moduleResolver.Load(engine, resolved);
            }
        }

        throw new ModuleNotFoundException();
    }

    public ResolvedSpecifier Resolve(string? referencingModuleLocation, ModuleRequest moduleRequest)
    {
        foreach (var moduleResolver in moduleResolvers)
        {
            var isMatch = moduleResolver.IsMatch(moduleRequest.Specifier);
            if (isMatch)
            {
                return moduleResolver.Resolved(referencingModuleLocation, moduleRequest);
            }
        }

        return new ResolvedSpecifier(moduleRequest, moduleRequest.Specifier, null, SpecifierType.Bare);
    }
}