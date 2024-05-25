namespace Pilotair.Core.Stores.NoSqlite;

public class Collection(string connectionString, string name) : Collection<IDictionary<string, object>>(connectionString)
{
    private readonly string name = name;
    public override string Name => name;
}