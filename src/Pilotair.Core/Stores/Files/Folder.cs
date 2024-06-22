using System.IO;

namespace Pilotair.Core.Stores.Files;

public class Folder(DirectoryInfo directoryInfo, string root) : Entry(directoryInfo, root)
{
    public override bool IsFolder => true;
}