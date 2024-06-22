using System.ComponentModel.DataAnnotations;
using System.IO;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores.NoSqlite;

public class Document<T>
{
    private string? dataHash;
    private T? data;

    [Range(1, 64)]
    public string Id { get; init; } = Guid.NewGuid().ToString();
    public string? ParentId { get; set; }
    public DateTimeOffset CreationTime { get; init; } = DateTimeHelper.UnixTimeMilliseconds();
    public DateTimeOffset LastWriteTime { get; init; } = DateTimeHelper.UnixTimeMilliseconds();
    public required T Data
    {
        get
        {
            if (data == null) throw new DataCanNotBeNullException();
            return data;
        }
        set
        {
            if (value == null) throw new DataCanNotBeNullException();
            dataHash = default;
            data = value;
        }
    }
    public bool Enabled { get; set; } = true;

    [Range(1, 64)]
    public string DataHash
    {
        get
        {
            if (dataHash == default)
            {
                lock (this)
                {
                    if (dataHash == default)
                    {
                        dataHash = ComputeDataHash();
                    }
                }
            }
            return dataHash;
        }
        init
        {
            dataHash = value;
        }
    }
    public string? Note { get; set; }

    private string ComputeDataHash()
    {
        if (Data == null) return string.Empty;
        else
        {
            using var memoryStream = new MemoryStream();
            JsonHelper.Serialize(memoryStream, Data);
            return CryptographyHelper.Hash256(memoryStream);
        }
    }
}