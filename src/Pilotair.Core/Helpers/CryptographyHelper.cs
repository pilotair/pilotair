using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Pilotair.Core.Helpers;

public static class CryptographyHelper
{
    public static string Hash256(Stream stream)
    {
        var bytes = SHA256.HashData(stream);
        return BinaryHelper.ByteToString(bytes);
    }

    public static string HashMd5(Stream stream, ushort? prefix = null)
    {
        var bytes = MD5.HashData(stream);
        if (prefix != null) BinaryHelper.SetPrefix(bytes, prefix.Value);
        return BinaryHelper.ByteToString(bytes);
    }

    public static string HashMd5(string value, ushort? prefix = null)
    {
        var bytes = MD5.HashData(Encoding.UTF8.GetBytes(value));
        if (prefix != null) BinaryHelper.SetPrefix(bytes, prefix.Value);
        return BinaryHelper.ByteToString(bytes);
    }


}