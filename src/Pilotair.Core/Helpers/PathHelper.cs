using System.Text;

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

    public static string Normalization(string path)
    {
        if (string.IsNullOrEmpty(path)) return string.Empty;
        var pathBuilder = new StringBuilder();

        char? previous = null;
        for (int i = 0; i < path.Length; i++)
        {
            var @char = path[i];
            if (@char == '\\')
            {
                @char = '/';
            }
            if (@char == '/' && previous == '/')
            {
                continue;
            }
            pathBuilder.Append(@char);
            previous = @char;
        }

        return pathBuilder.ToString();
    }
}