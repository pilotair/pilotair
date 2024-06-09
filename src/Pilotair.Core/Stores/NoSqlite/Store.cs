using System.Collections.Concurrent;
using Microsoft.Data.Sqlite;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores.NoSqlite;

public class NoSqliteStore
{
    private readonly string connectionString;
    private readonly ConcurrentDictionary<string, dynamic> collections = [];

    public NoSqliteStore(string path)
    {
        var dir = Path.GetDirectoryName(path);

        if (dir is not null)
        {
            IoHelper.EnsureDirectoryExist(dir);
        }

        var builder = new SqliteConnectionStringBuilder
        {
            DataSource = path,
            Cache = SqliteCacheMode.Shared,
            Pooling = true,
        };

        connectionString = builder.ToString();
    }

    public Collection<T> Get<T>()
    {
        if (!collections.TryGetValue(typeof(T).Name, out var collection))
        {
            throw new CollectionNotFoundException();
        }

        return collection;
    }

    public Collection Get(string name)
    {
        if (!collections.TryGetValue(name, out var collection))
        {
            throw new CollectionNotFoundException();
        }

        return collection;
    }

    public Collection<T> GetOrCreate<T>()
    {
        return collections.GetOrAdd(typeof(T).Name, (name) => new Collection<T>(connectionString));
    }

    public Collection GetOrCreate(string name)
    {
        return collections.GetOrAdd(name, (name) => new Collection(connectionString, name));
    }
}