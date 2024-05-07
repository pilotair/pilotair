using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores.NoSqlite;

public class Document<T> where T : new()
{
    public string Id { get; init; } = Guid.NewGuid().ToString();
    public DateTimeOffset CreationTime { get; init; } = DateTimeHelper.UnixTimeMilliseconds();
    public DateTimeOffset LastWriteTime { get; init; } = DateTimeHelper.UnixTimeMilliseconds();
    public required T Data { get; init; }
}