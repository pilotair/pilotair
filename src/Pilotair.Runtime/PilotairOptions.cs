namespace Pilotair.Runtime;

public class PilotairOptions
{
    public const string NAME = "Pilotair";
    public const string DATA_PATH = "data";

    public required string DataPath { get; init; } = Path.Combine(AppContext.BaseDirectory, DATA_PATH);
}