
namespace Pilotair.Web.Codes;

public class Code : Files.File
{
    public Code(FileInfo fileInfo, string basePath) : base(fileInfo)
    {
        RelationPath = System.IO.Path.GetRelativePath(basePath, Path);
    }

    public string RelationPath { get; init; }
}