using System.IO;

namespace Pilotair.Core.Helpers;

public static class IoHelper
{
    public static void EnsureDirectoryExist(string path)
    {
        if (string.IsNullOrWhiteSpace(path)) return;
        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }
    }

    public static void ShouldBeRelative(string path)
    {
        if (Path.IsPathRooted(path))
        {
            throw new InvalidDataException($"Path '{path}' must be relative");
        }
    }
}