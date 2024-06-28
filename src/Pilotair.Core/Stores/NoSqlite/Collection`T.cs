using System.Reflection;
using Dapper;
using Microsoft.Data.Sqlite;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores.NoSqlite;

public class Collection<T>
{
    private readonly string connectionString;

    public SqliteConnection Connection => new(connectionString);
    public Query<T> Query => new(Connection, Name);

    public Collection(string connectionString)
    {
        this.connectionString = connectionString;
        CreateTable();
    }

    public virtual string Name { get; init; } = typeof(T).Name;

    public async Task<Document<T>> GetAsync(string id)
    {
        using var connection = Connection;

        var result = await connection.QueryFirstOrDefaultAsync<DocumentModel>($"""
        SELECT 
            Id,
            ParentId,
            CreationTime,
            LastWriteTime,
            json(Data) as Data,
            Enabled,
            DataHash,
            Note
        FROM {Name} WHERE Id=@Id LIMIT 1
        """, new { Id = id });

        if (result == default)
        {
            throw new DocumentNotFoundException();
        }

        return result.ToDocument<T>();
    }

    public async Task<Document<T>> AddDocumentAsync(T data, string? parentId = default)
    {
        var doc = new Document<T>
        {
            ParentId = parentId,
            Data = data
        };
        await AddDocumentAsync(doc);
        return doc;
    }

    public async Task<Document<T>> AddDocumentAsync(Document<T> document)
    {
        if (document.Data is null)
        {
            throw new DocumentNotFoundException();
        }

        using var connection = Connection;
        var returnModel = await connection.QueryFirstAsync<DocumentModel>($"""
        INSERT INTO {Name} (
            Id,
            ParentId,
            CreationTime,
            LastWriteTime,
            Data,
            Enabled,
            DataHash,
            Note
        ) VALUES (
            @Id, 
            @ParentId,
            @CreationTime,
            @LastWriteTime,
            jsonb(@Data),
            @Enabled,
            @DataHash,
            @Note
        )
        RETURNING 
            Id,
            ParentId,
            CreationTime,
            LastWriteTime,
            json(Data) as Data,
            Enabled,
            DataHash,
            Note
        """, new
        {
            document.Id,
            document.ParentId,
            CreationTime = document.CreationTime.ToUnixTimeMilliseconds(),
            LastWriteTime = document.LastWriteTime.ToUnixTimeMilliseconds(),
            Data = JsonHelper.Serialize(document.Data),
            document.Enabled,
            document.DataHash,
            document.Note
        });

        return returnModel.ToDocument<T>();
    }

    public async Task<Document<T>> UpdateDocumentAsync(Document<T> document)
    {
        if (document.Data is null)
        {
            throw new DocumentNotFoundException();
        }

        using var connection = Connection;
        var returnModel = await connection.QueryFirstAsync<DocumentModel>($"""
        UPDATE {Name} 
        SET Data = jsonb(@Data),
            Enabled = @Enabled,
            DataHash = @DataHash,
            Note = @Note
        WHERE
            Id = @Id
        RETURNING 
            Id,
            ParentId,
            CreationTime,
            LastWriteTime,
            json(Data) as Data,
            Enabled,
            DataHash,
            Note
        """, new
        {
            document.Id,
            Data = JsonHelper.Serialize(document.Data),
            document.Enabled,
            document.DataHash,
            document.Note
        });
        return returnModel.ToDocument<T>();
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
            ParentId TEXT,
            CreationTime INTEGER NOT NULL,
            LastWriteTime INTEGER NOT NULL,
            Data BLOB NOT NULL CHECK(json_valid(Data,8)),
            Enabled INTEGER NOT NULL CHECK(Enabled IS TRUE OR Enabled IS FALSE),
            DataHash TEXT NOT NULL,
            Note TEXT
        );

        CREATE TRIGGER IF NOT EXISTS {Name}_TRIGGER
        AFTER UPDATE ON {Name}
        FOR EACH ROW
        BEGIN
            UPDATE {Name}
            SET LastWriteTime = unixepoch('subsec') * 1000
            WHERE Id = OLD.Id;
        END;

        CREATE INDEX IF NOT EXISTS {Name}_ParentId_INDEX
        ON {Name}(ParentId);

        CREATE INDEX IF NOT EXISTS {Name}_CreationTime_INDEX
        ON {Name}(CreationTime);

        CREATE INDEX IF NOT EXISTS {Name}_LastWriteTime_INDEX
        ON {Name}(LastWriteTime);

        CREATE INDEX IF NOT EXISTS {Name}_Enabled_INDEX
        ON {Name}(Enabled);
        """);
    }
}