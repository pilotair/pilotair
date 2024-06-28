namespace Pilotair.Core.Helpers;

public static class BinaryHelper
{
    public static string ByteToString(byte[] bytes)
    {
        return Convert.ToHexString(bytes).ToLower();
    }

    public static void SetPrefix(byte[] bytes, ushort prefix)
    {
        var shortBytes = BitConverter.GetBytes(prefix);
        bytes[0] = shortBytes[1];
        bytes[1] = shortBytes[0];
    }
}