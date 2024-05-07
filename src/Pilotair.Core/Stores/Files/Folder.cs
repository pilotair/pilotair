namespace Pilotair.Core.Stores.Files;

public class Folder(DirectoryInfo directoryInfo) : Entry(directoryInfo)
{
    public override bool IsFolder => true;
}