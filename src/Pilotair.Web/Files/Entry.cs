namespace Pilotair.Web.Files;

public abstract class Entry(FileSystemInfo fileSystemInfo)
{
    public string Name => fileSystemInfo.Name;
    public DateTime CreationTime => fileSystemInfo.CreationTimeUtc;
    public DateTime LastWriteTime => fileSystemInfo.LastWriteTimeUtc;
    public string Extension => fileSystemInfo.Extension;

    public abstract bool IsFolder { get; }
}