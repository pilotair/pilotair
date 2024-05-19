namespace Pilotair.Core.Runtime;

public class EngineOptions
{
    public string? RootPath { get; set; }

    public IModuleResolver[]? ModuleResolvers { get; set; }
}