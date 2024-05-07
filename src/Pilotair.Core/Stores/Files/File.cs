namespace Pilotair.Core.Stores.Files;

public class File(FileInfo fileInfo) : Entry(fileInfo)
{
    public override bool IsFolder => false;
}