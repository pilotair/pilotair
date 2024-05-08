using File = Pilotair.Core.Stores.Files.File;

namespace Pilotair.Web.Codes;

public class Code(File file, string content, string root)
{
    public File File { get; init; } = file;
    public string RelationPath { get; init; } = Path.GetRelativePath(root, file.Path);
    public string Content { get; init; } = content;
}