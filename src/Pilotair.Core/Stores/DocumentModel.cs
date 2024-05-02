using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores;

public class DocumentModel
{
    public required string Id { get; init; }
    public required long CreationTime { get; init; }
    public required long LastWriteTime { get; init; }
    public required string Data { get; init; }

    public Document<T> ToDocument<T>() where T : new()
    {
        var data = JsonHelper.Deserialize<T>(Data) ?? throw new DocumentDataInvalidException();

        return new Document<T>
        {
            Id = Id,
            CreationTime = DateTimeOffset.FromUnixTimeMilliseconds(CreationTime),
            LastWriteTime = DateTimeOffset.FromUnixTimeMilliseconds(LastWriteTime),
            Data = data
        };
    }
}