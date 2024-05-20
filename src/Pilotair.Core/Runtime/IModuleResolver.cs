using Jint.Runtime.Modules;

namespace Pilotair.Core.Runtime;

public interface IModuleResolver
{
    string Scheme { get; }
    ModuleResolved? TryResolve(string? referencingModuleLocation, ModuleRequest moduleRequest);

    string Load(Jint.Engine engine, Uri uri);
}

public class ModuleResolved(Uri uri, SpecifierType type)
{
    public Uri Uri { get; init; } = uri;
    public SpecifierType Type { get; init; } = type;
}