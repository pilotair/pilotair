using System.Text.Json;

namespace Pilotair.Core.Helpers;

public static class JsonHelper
{
    private static readonly JsonSerializerOptions _defaultOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        PropertyNameCaseInsensitive = true
    };

    public static async ValueTask<T?> DeserializeAsync<T>(string path, CancellationToken token = default)
    {
        using var stream = new FileStream(path, FileMode.Open);
        return await JsonSerializer.DeserializeAsync<T>(stream, _defaultOptions, token);
    }

    public static async Task SerializeAsync(object value, string path, CancellationToken token = default)
    {
        using var stream = new FileStream(path, FileMode.OpenOrCreate);
        await JsonSerializer.SerializeAsync(stream, value, _defaultOptions, token);
    }
}