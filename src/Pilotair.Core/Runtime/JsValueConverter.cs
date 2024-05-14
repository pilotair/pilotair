using System.Text.Json;
using System.Text.Json.Serialization;
using Jint;
using Jint.Native;

namespace Pilotair.Core.Runtime;

public class JsValueConverter(Engine engine) : JsonConverter<JsValue>
{
    public override JsValue? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        switch (reader.TokenType)
        {
            case JsonTokenType.String:
                return JsValue.FromObject(engine, reader.GetString());
            case JsonTokenType.Null:
            case JsonTokenType.None:
                return JsValue.Null;
            case JsonTokenType.True:
                return JsBoolean.True;
            case JsonTokenType.False:
                return JsBoolean.False;
            case JsonTokenType.Number:
                return JsValue.FromObject(engine, reader.GetDouble());
            case JsonTokenType.StartArray:
                var array = new JsArray(engine);
                while (reader.Read())
                {
                    if (reader.TokenType == JsonTokenType.EndArray)
                    {
                        return array;
                    }
                    var item = Read(ref reader, typeToConvert, options);
                    array.Push(item ?? JsValue.Undefined);
                }
                return default;
            case JsonTokenType.StartObject:
                var jsObject = new JsObject(engine);
                while (reader.Read())
                {
                    if (reader.TokenType == JsonTokenType.EndObject)
                    {
                        return jsObject;
                    }

                    if (reader.TokenType != JsonTokenType.PropertyName)
                    {
                        throw new JsonException();
                    }

                    var propertyName = reader.GetString() ?? throw new JsonException();

                    if (reader.Read())
                    {
                        var item = Read(ref reader, typeToConvert, options);
                        jsObject.Set(propertyName, item ?? JsValue.Undefined);
                    }
                }
                return default;
            default:
                return default;
        }
    }

    public override void Write(Utf8JsonWriter writer, JsValue value, JsonSerializerOptions options)
    {
        if (value.IsArray())
        {
            writer.WriteStartArray();
            var jsArray = value.AsArray();
            foreach (var jsValue in jsArray)
            {
                Write(writer, jsValue, options);
            }
            writer.WriteEndArray();
        }

        if (value.IsObject())
        {
            writer.WriteStartObject();
            var jsObject = value.AsObject();

            foreach (var item in jsObject.GetOwnPropertyKeys())
            {
                writer.WritePropertyName(item.AsString());
                Write(writer, jsObject.Get(item), options);
            }
            writer.WriteEndObject();
        }

        if (value.IsNumber())
        {
            writer.WriteNumberValue(value.AsNumber());
        }

        if (value.IsBoolean())
        {
            writer.WriteBooleanValue(value.AsBoolean());
        }

        if (value.IsNull())
        {
            writer.WriteNullValue();
        }

        if (value.IsString())
        {
            writer.WriteStringValue(value.AsString());
        }
    }
}