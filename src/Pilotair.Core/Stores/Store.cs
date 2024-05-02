using System.Collections.Concurrent;
using Microsoft.Data.Sqlite;

namespace Pilotair.Core.Stores;

public class Store
{
    private readonly string connectionString;
    private readonly ConcurrentDictionary<string, dynamic> collections = [];

    public Store(string path)
    {
        var builder = new SqliteConnectionStringBuilder
        {
            DataSource = path,
            Cache = SqliteCacheMode.Shared,
            Pooling = true
        };

        connectionString = builder.ToString();
    }

    public Collection<T> Get<T>() where T : class, new()
    {
        if (!collections.TryGetValue(typeof(T).Name, out var collection))
        {
            throw new CollectionNotFoundException();
        }

        return collection;
    }

    public Collection<T> GetOrCreate<T>() where T : class, new()
    {
        return collections.GetOrAdd(typeof(T).Name, (name) => new Collection<T>(connectionString));
    }
}