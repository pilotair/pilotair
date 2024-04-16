namespace Pilotair.Web.Files;

public class File(FileInfo fileInfo) : Entry(fileInfo)
{
    public override bool IsFolder => false;
}