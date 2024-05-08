using System.Text.Json.Serialization;

namespace Pilotair.Core.Stores.Files;

public abstract class Entry(FileSystemInfo fileSystemInfo, string root)
{
    public string Name => fileSystemInfo.Name;
    public DateTime CreationTime => fileSystemInfo.CreationTimeUtc;
    public DateTime LastWriteTime => fileSystemInfo.LastWriteTimeUtc;
    public string Extension => fileSystemInfo.Extension;

    [JsonIgnore]
    public string Path => fileSystemInfo.FullName;
    public abstract bool IsFolder { get; }

    public string RelationPath { get; init; } = System.IO.Path.GetRelativePath(root, fileSystemInfo.FullName);
}