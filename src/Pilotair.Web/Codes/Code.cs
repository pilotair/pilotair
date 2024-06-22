using Pilotair.Core.Stores.Files;

namespace Pilotair.Web.Codes;

public class Code(File file, string content, string root)
{
    public File File { get; init; } = file;
    public string RelationPath { get; init; } = System.IO.Path.GetRelativePath(root, file.Path);
    public string Content { get; init; } = content;
}