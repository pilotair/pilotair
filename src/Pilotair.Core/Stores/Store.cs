using Microsoft.Data.Sqlite;

namespace Pilotair.Core.Stores;

public abstract class Store
{
    protected readonly string connectionString;

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
}