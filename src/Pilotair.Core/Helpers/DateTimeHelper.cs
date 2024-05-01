namespace Pilotair.Core.Helpers;

public static class DateTimeHelper
{
    public static DateTimeOffset UnixTimeMilliseconds()
    {
        return DateTimeOffset.FromUnixTimeMilliseconds(DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());
    }
}