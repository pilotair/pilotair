using Esprima;
using Jint;
using Jint.Runtime.Modules;

namespace Pilotair.Core.Runtime;

public class ModuleLoader(IEnumerable<IModuleResolver> moduleResolvers, IEnumerable<IModuleTransformer> moduleTransformers) : IModuleLoader
{
    public Module LoadModule(Engine engine, ResolvedSpecifier resolved)
    {
        foreach (var moduleResolver in moduleResolvers)
        {
            var isMatch = moduleResolver.Scheme == resolved.Uri?.Scheme;
            if (isMatch)
            {
                var code = moduleResolver.Load(engine, resolved);

                foreach (var moduleTransformer in moduleTransformers)
                {
                    if (resolved.Uri != default && moduleTransformer.Match(resolved.Uri))
                    {
                        code = moduleTransformer.Transform(code);
                    }
                }

                var javaScriptParser = new JavaScriptParser();
                var module = javaScriptParser.ParseModule(code, resolved.Uri.ToString());
                return ModuleFactory.BuildSourceTextModule(engine, module);
            }
        }

        throw new ModuleNotFoundException();
    }

    public ResolvedSpecifier Resolve(string? referencingModuleLocation, ModuleRequest moduleRequest)
    {
        foreach (var moduleResolver in moduleResolvers)
        {
            var resolvedSpecifier = moduleResolver.TryResolve(referencingModuleLocation, moduleRequest);
            if (resolvedSpecifier != default) return resolvedSpecifier;
        }

        return new ResolvedSpecifier(moduleRequest, moduleRequest.Specifier, null, SpecifierType.Bare);
    }
}