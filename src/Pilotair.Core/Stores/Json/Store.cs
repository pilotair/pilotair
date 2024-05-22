using System.Collections.Concurrent;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores.Json;

public class JsonStore
{
    private readonly string root;
    private readonly ConcurrentDictionary<string, dynamic> collections = [];

    public JsonStore(string root)
    {
        IoHelper.EnsureDirectoryExist(root);
        this.root = root;
    }

    public Collection<T> GetCollection<T>()
    {
        if (!collections.TryGetValue(typeof(T).Name, out var collection))
        {
            throw new CollectionNotFoundException();
        }

        return collection;
    }

    public async Task SaveAsync(string name, object value, CancellationToken token = default)
    {
        var path = Path.Combine(root, $"{name}.json");
        await JsonHelper.SerializeAsync(value, path, token);
    }

    public async Task<T?> GetAsync<T>(string name, CancellationToken token = default)
    {
        var path = Path.Combine(root, $"{name}.json");
        var result = await JsonHelper.DeserializeAsync<T>(path, token);
        return result;
    }

    public Collection<T> Get<T>() where T : new()
    {
        if (!collections.TryGetValue(typeof(T).Name, out var collection))
        {
            throw new CollectionNotFoundException();
        }

        return collection;
    }

    public Collection<T> GetOrCreate<T>() where T : new()
    {
        return collections.GetOrAdd(typeof(T).Name, (name) => new Collection<T>(root));
    }
}