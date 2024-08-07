
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;

namespace Pilotair.Core.CodeGeneration;

public class OpenApiAdapter(OpenApiDocument document) : ISourceAdapter
{
    public IEnumerable<Schema> Mapping()
    {
        var result = new HashSet<Schema>();

        foreach (var item in document.Components.Schemas)
        {
            var properties = GetProperties(item.Value);
            var enums = GetEnums(item.Value);
            var name = item.Key;
            var splitIndex = name.LastIndexOf('.');
            var @namespace = string.Empty;

            if (splitIndex > -1)
            {
                @namespace = name[..splitIndex];
                name = name[(splitIndex + 1)..];
            }

            var schema = new Schema
            {
                Name = name,
                Namespace = @namespace,
                Properties = properties,
                Enums = enums
            };

            result.Add(schema);
        }

        return result;
    }

    private static IEnumerable<Schema.Property> GetProperties(OpenApiSchema schema)
    {
        var result = new HashSet<Schema.Property>();

        foreach (var item in schema.Properties)
        {
            var name = item.Key;
            if (item.Value.Nullable) name += '?';
            var type = item.Value.Type;
            type = type switch
            {
                "integer" => "number",
                "boolean" => "boolean",
                "string" => item.Value.Reference?.Id ?? type,
                "object" => item.Value.Reference?.Id ?? "record<string,unknown>",
                "array" => (item.Value.Items.Reference?.Id ?? type) + "[]",
                _ => item.Value.Reference?.Id,
            };

            var property = new Schema.Property(name, type ?? "unknown");
            result.Add(property);
        }

        return result;
    }


    private static IEnumerable<object> GetEnums(OpenApiSchema schema)
    {
        var result = new HashSet<object>();

        foreach (var item in schema.Enum)
        {
            if (item is OpenApiString openApiString)
            {
                result.Add(openApiString.Value);
            }
            else if (item is OpenApiInteger openApiInteger)
            {
                result.Add(openApiInteger.Value);
            }
        }

        return result;
    }
}