namespace Pilotair.Core.Helpers;

public class Base64UrlHelper()
{

    public static string EncodeObject(object? input)
    {
        if (input == null) return string.Empty;
        return Encode(JsonHelper.Serialize(input));
    }

    public static string Encode(byte[]? input)
    {
        ArgumentNullException.ThrowIfNull(input);
        var base64 = Convert.ToBase64String(input);
        return base64.Replace('+', '-').Replace('/', '_').TrimEnd('=');
    }

    public static string Encode(string? input)
    {
        ArgumentNullException.ThrowIfNull(input);
        var bytes = System.Text.Encoding.UTF8.GetBytes(input);
        return Encode(bytes);
    }

    public static string Decode(string base64Url)
    {
        var bytes = DecodeBytes(base64Url);
        return System.Text.Encoding.UTF8.GetString(bytes);
    }

    public static byte[] DecodeBytes(string base64Url)
    {
        var base64 = base64Url.Replace('-', '+').Replace('_', '/');
        switch (base64.Length % 4)
        {
            case 2: base64 += "=="; break;
            case 3: base64 += "="; break;
        }
        return Convert.FromBase64String(base64);
    }
}