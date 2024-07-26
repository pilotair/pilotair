using Jint;
using Jint.Runtime.Modules;

namespace Pilotair.Core.Runtime;

public class ModuleLoader() : IModuleLoader
{
    public required IEnumerable<IModuleResolver> ModuleResolvers { get; init; }
    public required IEnumerable<IModuleTransformer>? ModuleTransformers { get; init; }
    public required JsEngine Engine { get; init; }

    public Module LoadModule(Engine engine, ResolvedSpecifier resolved)
    {
        if (resolved.Uri != default)
        {
            foreach (var moduleResolver in ModuleResolvers)
            {
                var isMatch = moduleResolver.Scheme == resolved.Uri?.Scheme;
                if (isMatch)
                {
                    var code = moduleResolver.Load(engine, resolved.Uri!);

                    if (ModuleTransformers != default)
                    {
                        foreach (var moduleTransformer in ModuleTransformers)
                        {
                            if (resolved.Uri != default && moduleTransformer.Match(resolved.Uri))
                            {
                                code = moduleTransformer.Transform(code);
                            }
                        }
                    }

                    var moduleResolved = new ResolvedSpecifier(
                        resolved.ModuleRequest,
                        resolved.Key,
                        default,
                        resolved.Type
                    );
                    
                    return ModuleFactory.BuildSourceTextModule(engine, moduleResolved, code);
                }
            }
        }

        throw new ModuleNotFoundException();
    }

    public ResolvedSpecifier Resolve(string? referencingModuleLocation, ModuleRequest moduleRequest)
    {
        foreach (var moduleResolver in ModuleResolvers)
        {

            var resolved = moduleResolver.TryResolve(referencingModuleLocation, moduleRequest.Specifier, Engine);

            if (resolved != default)
            {
                return new ResolvedSpecifier(
                    moduleRequest,
                    resolved.Uri.ToString(),
                    resolved.Uri,
                    SpecifierType.RelativeOrAbsolute
                );
            };
        }

        throw new ModuleNotFoundException();
    }
}