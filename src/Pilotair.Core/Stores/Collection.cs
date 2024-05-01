using Dapper;
using Microsoft.Data.Sqlite;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores;

public class Collection<T> where T : class, new()
{
    private readonly string connectionString;

    public SqliteConnection Connection => new(connectionString);

    public Collection(string connectionString)
    {
        this.connectionString = connectionString;
        CreateTable();
    }

    public string Name { get; init; } = typeof(T).Name;


    public async Task<Document<T>> GetAsync(string id)
    {
        using var connection = Connection;
        var result = await connection.QueryFirstOrDefaultAsync<(string Id, long CreationTime, long LastWriteTime, string Data)>($"""
        SELECT 
            Id,
            CreationTime,
            LastWriteTime,
            Data 
        FROM {Name} WHERE Id=@Id LIMIT 1
        """, new { Id = id });

        if (result == default)
        {
            throw new DocumentNotFoundException();
        }

        var data = JsonHelper.Deserialize<T>(result.Data) ?? throw new DocumentDataInvalidException();

        return new Document<T>
        {
            Id = result.Id,
            CreationTime = DateTimeOffset.FromUnixTimeMilliseconds(result.CreationTime),
            LastWriteTime = DateTimeOffset.FromUnixTimeMilliseconds(result.LastWriteTime),
            Data = data
        };
    }

    public async Task<Document<T>> AddDocumentAsync(T data)
    {
        var doc = new Document<T>
        {
            Data = data
        };
        await AddDocumentAsync(doc);
        return doc;
    }

    public async Task AddDocumentAsync(Document<T> document)
    {
        if (document.Data is null)
        {
            throw new DocumentNotFoundException();
        }

        using var connection = Connection;
        await connection.ExecuteAsync($"""
        INSERT INTO {Name} (
            Id,
            CreationTime,
            LastWriteTime,
            Data
        ) VALUES (
            @Id, 
            @CreationTime,
            @LastWriteTime,
            @Data
        )
        """, new
        {
            document.Id,
            CreationTime = document.CreationTime.ToUnixTimeMilliseconds(),
            LastWriteTime = document.LastWriteTime.ToUnixTimeMilliseconds(),
            Data = JsonHelper.Serialize(document.Data)
        });
    }

    public async Task UpdateDocumentAsync(Document<T> document)
    {
        if (document.Data is null)
        {
            throw new DocumentNotFoundException();
        }

        using var connection = Connection;
        await connection.ExecuteAsync($"""
        UPDATE {Name} 
        SET Data = @Data
        WHERE
            Id = @Id
        """, new
        {
            document.Id,
            Data = JsonHelper.Serialize(document.Data)
        });
    }

    public async Task RemoveDocumentAsync(string id)
    {
        await RemoveDocumentAsync([id]);
    }

    public async Task RemoveDocumentAsync(string[] ids)
    {
        using var connection = Connection;
        await connection.ExecuteAsync($"""
        DELETE FROM {Name}
        WHERE Id IN @Ids;
        """, new { Ids = ids });
    }

    private void CreateTable()
    {
        using var connection = Connection;
        connection.Execute($"""
        CREATE TABLE IF NOT EXISTS {Name} (
            Id TEXT PRIMARY KEY,
            CreationTime INTEGER NOT NULL,
            LastWriteTime INTEGER NOT NULL,
            Data TEXT NOT NULL CHECK(json_valid(Data))
        );

        CREATE TRIGGER IF NOT EXISTS {Name}_TRIGGER
        AFTER UPDATE ON {Name}
        FOR EACH ROW
        BEGIN
            UPDATE {Name}
            SET LastWriteTime = unixepoch('now')
            WHERE Id = OLD.Id;
        END;
        """);
    }
}