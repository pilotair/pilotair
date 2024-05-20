using Jint.Runtime.Modules;

namespace Pilotair.Core.Runtime;

public interface IModuleResolver
{
    string Scheme { get; }
    ResolvedSpecifier? TryResolve(string? referencingModuleLocation, ModuleRequest moduleRequest);

    string Load(Jint.Engine engine, ResolvedSpecifier resolved);
}