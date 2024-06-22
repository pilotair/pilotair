using System.IO;

namespace Pilotair.Core.Stores.Files;

public class File(FileInfo fileInfo, string root) : Entry(fileInfo, root)
{
    public override bool IsFolder => false;
}