namespace Pilotair.Core.Helpers;

public static class PathHelper
{
    public static bool IsRelativeOrAbsolute(string path)
    {
        if (string.IsNullOrWhiteSpace(path)) return false;
        return IsRelative(path) || path.StartsWith('/');
    }

    public static bool IsRelative(string path)
    {
        if (string.IsNullOrWhiteSpace(path)) return false;
        return path.StartsWith("./") || path.StartsWith("../");
    }
}