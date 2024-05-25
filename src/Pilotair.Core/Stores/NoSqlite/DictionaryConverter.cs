using System.Text.Json;
using System.Text.Json.Serialization;

namespace Pilotair.Core.Stores.NoSqlite;

public class DictionaryConverter : JsonConverter<IDictionary<string, object?>>
{
    public override IDictionary<string, object?>? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.Null) return null;
        var result = new Dictionary<string, object?>();
        var element = JsonElement.ParseValue(ref reader);

        foreach (var item in element.EnumerateObject())
        {
            result.Add(item.Name, GetJsonElementValue(item.Value));
        }

        return result;
    }

    public override void Write(Utf8JsonWriter writer, IDictionary<string, object?> value, JsonSerializerOptions options)
    {
        JsonSerializer.Serialize(writer, value, options);
    }

    private static object? GetJsonElementValue(JsonElement jsonElement)
    {
        switch (jsonElement.ValueKind)
        {
            case JsonValueKind.Object:
                var dic = new Dictionary<string, object?>();
                foreach (var item in jsonElement.EnumerateObject())
                {
                    dic[item.Name] = GetJsonElementValue(item.Value);
                }
                return dic;
            case JsonValueKind.Array:
                var arr = new List<object?>();
                foreach (var item in jsonElement.EnumerateArray())
                {
                    arr.Add(GetJsonElementValue(item));
                }
                return arr.ToArray();
            case JsonValueKind.String:
                return jsonElement.GetString();
            case JsonValueKind.Number:
                return jsonElement.GetDouble();
            case JsonValueKind.True:
                return true;
            case JsonValueKind.False:
                return false;
            case JsonValueKind.Undefined:
            case JsonValueKind.Null:
            default:
                return null;
        }
    }
}