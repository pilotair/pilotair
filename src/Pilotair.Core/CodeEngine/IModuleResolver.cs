using Jint;
using Jint.Runtime.Modules;

namespace Pilotair.Core.CodeEngine;

public interface IModuleResolver
{
    string Scheme { get; }
    bool IsMatch(string referencingModuleLocation);

    ResolvedSpecifier Resolved(string? referencingModuleLocation, ModuleRequest moduleRequest);

    Module Load(Engine engine, ResolvedSpecifier resolved);
}