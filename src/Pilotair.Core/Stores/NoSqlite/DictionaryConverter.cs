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
        writer.WriteStartObject();
        foreach (var item in value)
        {
            writer.WritePropertyName(item.Key);
            Write(writer, item.Value, options);
        }
        writer.WriteEndObject();
    }

    private static void Write(Utf8JsonWriter writer, object? value, JsonSerializerOptions options)
    {
        if (value is Array array)
        {
            writer.WriteStartArray();
            foreach (var i in array)
            {
                Write(writer, i, options);
            }
            writer.WriteEndArray();
        }

        if (value is int || value is double || value is float || value is long || value is decimal || value is short || value is byte || value is uint || value is ulong || value is ushort || value is sbyte)
        {
            writer.WriteNumberValue(Convert.ToDecimal(value));
        }

        if (value is bool boolean)
        {
            writer.WriteBooleanValue(boolean);
        }

        if (value is null)
        {
            writer.WriteNullValue();
        }

        if (value is string stringValue)
        {
            writer.WriteStringValue(stringValue);
        }

        if (value is IDictionary<string, object> dictionary)
        {
            Write(writer, dictionary, options);
        }
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