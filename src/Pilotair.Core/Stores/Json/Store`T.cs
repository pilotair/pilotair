using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores.Json;

public class JsonStore<T>
{
    private readonly string folder;

    public JsonStore(string root, string? folder = default)
    {
        this.folder = Path.Combine(root, folder ?? typeof(T).Name);
        IoHelper.EnsureDirectoryExist(this.folder);
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

    public async Task<T?> GetAsync(string name, CancellationToken token = default)
    {
        var path = Path.Combine(folder, $"{name}.json");
        var result = await JsonHelper.DeserializeAsync<T>(path, token);
        return result;
    }

    public bool Exist(string name)
    {
        var path = Path.Combine(folder, $"{name}.json");
        return File.Exists(path);
    }
    
    public void Delete(string name)
    {
        var path = Path.Combine(folder, $"{name}.json");
        if (File.Exists(path)) File.Delete(path);
    }
}