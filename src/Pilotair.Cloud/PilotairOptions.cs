using Pilotair.Cloud.Container;

namespace Pilotair.Cloud;

public class PilotairOptions
{
    public const string NAME = "Pilotair";
    public const string DATA_PATH = "data";

    public string DataPath { get; init; } = Path.Combine(AppContext.BaseDirectory, DATA_PATH);

    public ContainerOptions Container { get; init; } = new ContainerOptions();
}