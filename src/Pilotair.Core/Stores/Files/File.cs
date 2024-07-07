using System.IO;

namespace Pilotair.Core.Stores.Files;

public class File : Entry
{
    private readonly EntryType type;

    public File(FileInfo fileInfo, string root, IMimeMapping mimeMapping) : base(fileInfo, root)
    {
        if (mimeMapping.TryGetContentType(RelationPath, out var contentType))
        {
            ContentType = contentType;
        }

        type = mimeMapping.GetEntryType(ContentType);
    }

    public override EntryType Type => type;

    public string ContentType { get; init; } = "application/octet-stream";
}