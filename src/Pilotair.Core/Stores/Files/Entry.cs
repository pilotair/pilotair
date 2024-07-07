using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Text.Json.Serialization;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores.Files;

public abstract class Entry(FileSystemInfo fileSystemInfo, string root)
{
    [Required]
    public string Name => fileSystemInfo.Name;

    public DateTime CreationTime => fileSystemInfo.CreationTimeUtc;

    public DateTime LastWriteTime => fileSystemInfo.LastWriteTimeUtc;

    [Required]
    public string Extension => fileSystemInfo.Extension;

    [JsonIgnore]
    public string Path => fileSystemInfo.FullName;

    public virtual long Size { get; }

    public virtual string ContentType { get; } = string.Empty;

    public abstract EntryType Type { get; }

    [Required]
    public string RelationPath { get; init; } = System.IO.Path.GetRelativePath(root, fileSystemInfo.FullName);

    public string Hash => CryptographyHelper.HashMd5(CreationTime.Ticks + LastWriteTime.Ticks + RelationPath + Size);
}