namespace Pilotair.Cloud.Containers;

public class ContainerOptions
{
    public Uri Server { get; init; } = new Uri("unix:///var/run/docker.sock");
    public string Label { get; init; } = "pilotair";
}