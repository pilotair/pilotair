namespace Pilotair.Core.Helpers;

public static class IoHelper
{
    public static void EnsureDirectoryExist(string path)
    {
        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }
    }
}