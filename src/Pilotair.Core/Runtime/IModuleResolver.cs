using Jint.Runtime.Modules;

namespace Pilotair.Core.Runtime;

public interface IModuleResolver
{
    string Scheme { get; }
    bool IsMatch(string referencingModuleLocation);

    ResolvedSpecifier Resolved(string? referencingModuleLocation, ModuleRequest moduleRequest);

    Module Load(Jint.Engine engine, ResolvedSpecifier resolved);
}