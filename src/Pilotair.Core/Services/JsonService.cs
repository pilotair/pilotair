using System.Text.Json;

namespace Pilotair.Core.Services
{
    public class JsonService(JsonSerializerOptions options)
    {
        public async ValueTask<T?> DeserializeAsync<T>(string path, CancellationToken token = default)
        {
            using var stream = new FileStream(path, FileMode.Open);
            return await JsonSerializer.DeserializeAsync<T>(stream, options, token);
        }

        public async Task SerializeAsync(object value, string path, CancellationToken token = default)
        {
            using var stream = new FileStream(path, FileMode.OpenOrCreate);
            await JsonSerializer.SerializeAsync(stream, value, options, token);
        }
    }
}