using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores.Json;

public class JsonStore<T>
{
    private readonly string folder;

    public JsonStore(string root)
    {
        folder = Path.Combine(root, typeof(T).Name);
        IoHelper.EnsureDirectoryExist(folder);
    }

    public async Task<IEnumerable<T>> ListAsync(CancellationToken token = default)
    {
        var files = Directory.GetFiles(folder, "*.json");
        var result = new List<T>();
        foreach (var item in files)
        {
            var value = await JsonHelper.DeserializeAsync<T>(item, token);
            if (value != null) result.Add(value);
        }
        return result;
    }

    public async Task SaveAsync(string name, T value, CancellationToken token = default)
    {
        ArgumentNullException.ThrowIfNull(value);
        var path = Path.Combine(folder, $"{name}.json");
        await JsonHelper.SerializeAsync(value, path, token);
    }

    public async Task<T> GetAsync(string name, CancellationToken token = default)
    {
        var path = Path.Combine(folder, $"{name}.json");
        var result = await JsonHelper.DeserializeAsync<T>(path, token) ?? throw new DocumentNotFoundException();
        return result;
    }

    public void Delete(string name)
    {
        var path = Path.Combine(folder, $"{name}.json");
        if (File.Exists(path)) File.Delete(path);
    }
}