namespace Pilotair.Core.Resource;

public class StaticFile
{
    public StaticFile(FileInfo fileInfo)
    {
        Creation = fileInfo.CreationTimeUtc;
        LastWrite = fileInfo.LastWriteTimeUtc;
        Path = fileInfo.FullName;
    }

    public string Path { get; init; }
    public DateTime Creation { get; init; }
    public DateTime LastWrite { get; init; }
}