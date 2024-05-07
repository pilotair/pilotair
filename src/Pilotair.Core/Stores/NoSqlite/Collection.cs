using Dapper;
using Microsoft.Data.Sqlite;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores.NoSqlite;

public class Collection<T> where T : new()
{
    private readonly string connectionString;

    public SqliteConnection Connection => new(connectionString);
    public Query<T> Query => new(Connection, Name);

    public Collection(string connectionString)
    {
        this.connectionString = connectionString;
        CreateTable();
    }

    public string Name { get; init; } = typeof(T).Name;

    public async Task<Document<T>> GetAsync(string id)
    {
        using var connection = Connection;

        var result = await connection.QueryFirstOrDefaultAsync<DocumentModel>($"""
        SELECT 
            Id,
            CreationTime,
            LastWriteTime,
            json(Data) as Data 
        FROM {Name} WHERE Id=@Id LIMIT 1
        """, new { Id = id });

        if (result == default)
        {
            throw new DocumentNotFoundException();
        }

        return result.ToDocument<T>();
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
            jsonb(@Data)
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
        SET Data = jsonb(@Data)
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
            Data BLOB NOT NULL CHECK(json_valid(Data,8))
        );

        CREATE TRIGGER IF NOT EXISTS {Name}_TRIGGER
        AFTER UPDATE ON {Name}
        FOR EACH ROW
        BEGIN
            UPDATE {Name}
            SET LastWriteTime = unixepoch('subsec') * 1000
            WHERE Id = OLD.Id;
        END;
        """);
    }
}