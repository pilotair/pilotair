namespace Pilotair.Application.Codes;

public class Code(Core.Stores.Files.File file, string content, string root)
{
    public Core.Stores.Files.File File { get; init; } = file;
    public string RelationPath { get; init; } = System.IO.Path.GetRelativePath(root, file.Path);
    public string Content { get; init; } = content;
}