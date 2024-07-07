using System.IO;

namespace Pilotair.Core.Stores.Files;

public class File : Entry
{
    private readonly EntryType type;
    private readonly FileInfo fileInfo;
    private readonly string contentType = "application/octet-stream";

    public File(FileInfo fileInfo, string root, IMimeMapping mimeMapping) : base(fileInfo, root)
    {
        this.fileInfo = fileInfo;
        if (mimeMapping.TryGetContentType(RelationPath, out var contentType))
        {
            this.contentType = contentType;
        }

        type = mimeMapping.GetEntryType(ContentType);
    }

    public override EntryType Type => type;

    public override long Size => fileInfo.Length;

    public override string ContentType => contentType;
}