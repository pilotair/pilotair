using System.Security.Cryptography;

namespace Pilotair.Core.Helpers;

public static class CryptographyHelper
{
    public static string Hash256(Stream stream)
    {
        var inputHash = SHA256.HashData(stream);
        return Convert.ToHexString(inputHash);
    }
}