namespace Pilotair.Web.Files;

public class Folder(DirectoryInfo directoryInfo) : Entry(directoryInfo)
{
    public override bool IsFolder => true;
}