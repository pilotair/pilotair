using Esprima;
using Jint;
using Jint.Runtime.Modules;

namespace Pilotair.Core.Runtime;

public class ModuleLoader : IModuleLoader
{
    public required IEnumerable<IModuleResolver> ModuleResolvers { get; init; }
    public required IEnumerable<IModuleTransformer>? ModuleTransformers { get; init; }

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

                    var javaScriptParser = new JavaScriptParser();
                    var module = javaScriptParser.ParseModule(code, resolved.Uri!.ToString());
                    return ModuleFactory.BuildSourceTextModule(engine, module);
                }
            }
        }

        throw new ModuleNotFoundException();
    }

    public ResolvedSpecifier Resolve(string? referencingModuleLocation, ModuleRequest moduleRequest)
    {
        foreach (var moduleResolver in ModuleResolvers)
        {
            var resolved = moduleResolver.TryResolve(referencingModuleLocation, moduleRequest);

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