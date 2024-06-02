using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores.NoSqlite;

public class DocumentModel
{
    public required string Id { get; init; }
    public string? ParentId { get; set; }
    public required long CreationTime { get; init; }
    public required long LastWriteTime { get; init; }
    public required string Data { get; init; }
    public required bool Enabled { get; init; }
    public required string DataHash { get; init; }

    public Document<T> ToDocument<T>()
    {
        var data = JsonHelper.Deserialize<T>(Data) ?? throw new DocumentDataInvalidException();

        return new Document<T>
        {
            Id = Id,
            ParentId = ParentId,
            CreationTime = DateTimeOffset.FromUnixTimeMilliseconds(CreationTime),
            LastWriteTime = DateTimeOffset.FromUnixTimeMilliseconds(LastWriteTime),
            Data = data,
            Enabled = Enabled,
            DataHash = DataHash,
        };
    }
}