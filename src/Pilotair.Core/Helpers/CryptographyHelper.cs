using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Pilotair.Core.Helpers;

public static class CryptographyHelper
{
    public static string Hash256(Stream stream)
    {
        var bytes = SHA256.HashData(stream);
        return ByteToString(bytes);
    }

    public static string HashMd5(Stream stream, ushort? prefix = null)
    {
        var bytes = MD5.HashData(stream);
        if (prefix != null) SetPrefix(bytes, prefix.Value);
        return ByteToString(bytes);
    }

    public static string HashMd5(string value, ushort? prefix = null)
    {
        var bytes = MD5.HashData(Encoding.UTF8.GetBytes(value));
        if (prefix != null) SetPrefix(bytes, prefix.Value);
        return ByteToString(bytes);
    }

    private static string ByteToString(byte[] bytes)
    {
        return Convert.ToHexString(bytes).ToLower();
    }

    private static void SetPrefix(byte[] bytes, ushort prefix)
    {
        var shortBytes = BitConverter.GetBytes(prefix);
        bytes[0] = shortBytes[1];
        bytes[1] = shortBytes[0];
    }
}