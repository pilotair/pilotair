using System.IO;
using System.Text.Encodings.Web;
using System.Text.Json;
using Pilotair.Core.Stores.NoSqlite;

namespace Pilotair.Core.Helpers;

public static class JsonHelper
{
    private static readonly JsonSerializerOptions defaultOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        PropertyNameCaseInsensitive = true,
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
    };

    static JsonHelper()
    {
        defaultOptions.Converters.Add(new DictionaryConverter());
    }

    public static T? Deserialize<T>(string json)
    {
        return JsonSerializer.Deserialize<T>(json, defaultOptions);
    }

    public static string Serialize(object value)
    {
        return JsonSerializer.Serialize(value, defaultOptions);
    }

    public static void Serialize(Stream stream, object value)
    {
        JsonSerializer.Serialize(stream, value, defaultOptions);
    }

    public static async ValueTask<T?> DeserializeAsync<T>(string path, CancellationToken token = default)
    {
        using var stream = new FileStream(path, FileMode.Open);
        return await DeserializeAsync<T>(stream, token);
    }

    public static async ValueTask<T?> DeserializeAsync<T>(Stream stream, CancellationToken token = default)
    {
        return await JsonSerializer.DeserializeAsync<T>(stream, defaultOptions, token);
    }

    public static async Task SerializeAsync(object value, string path, CancellationToken token = default)
    {
        using var stream = File.Create(path);
        await JsonSerializer.SerializeAsync(stream, value, defaultOptions, token);
    }
}