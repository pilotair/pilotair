using System.IO;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores.Json;

public class JsonStore
{
    private readonly string root;

    public JsonStore(string root)
    {
        IoHelper.EnsureFolderExist(root);
        this.root = root;
    }

    public async Task SaveAsync<T>(object value, CancellationToken token = default)
    {
        var path = Path.Combine(root, $"{typeof(T).Name}.json");
        await JsonHelper.SerializeAsync(value, path, token);
    }

    public async Task<T> GetAsync<T>(string name, CancellationToken token = default)
    {
        var path = Path.Combine(root, $"{name}.json");
        var result = await JsonHelper.DeserializeAsync<T>(path, token) ?? throw new DocumentNotFoundException();
        return result;
    }
}