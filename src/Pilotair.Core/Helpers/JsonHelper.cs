using System.Text.Json;

namespace Pilotair.Core.Helpers;

public static class JsonHelper
{
    private static readonly JsonSerializerOptions defaultOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        PropertyNameCaseInsensitive = true
    };

    public static T? Deserialize<T>(string json)
    {
        return JsonSerializer.Deserialize<T>(json, defaultOptions);
    }

    public static string Serialize(object value)
    {
        return JsonSerializer.Serialize(value, defaultOptions);
    }

    public static async ValueTask<T?> DeserializeAsync<T>(string path, CancellationToken token = default)
    {
        using var stream = new FileStream(path, FileMode.Open);
        return await JsonSerializer.DeserializeAsync<T>(stream, defaultOptions, token);
    }

    public static async Task SerializeAsync(object value, string path, CancellationToken token = default)
    {
        using var stream = new FileStream(path, FileMode.OpenOrCreate);
        await JsonSerializer.SerializeAsync(stream, value, defaultOptions, token);
    }
}