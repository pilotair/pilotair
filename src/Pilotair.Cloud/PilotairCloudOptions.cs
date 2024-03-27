namespace Pilotair.Cloud;

public class PilotairCloudOptions
{
    public const string NAME = "PilotairCloud";

    public string DataPath { get; init; } = Path.Combine(AppContext.BaseDirectory, "data");
}