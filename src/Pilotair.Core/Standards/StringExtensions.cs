using System.Text.RegularExpressions;

namespace System;

public static class StringExtensions
{
    public static string Slugify(this string value)
    {
        return Regex.Replace(value, "([a-z])([A-Z])", "$1-$2").ToLower();
    }
}