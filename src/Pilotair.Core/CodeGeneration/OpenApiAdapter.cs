
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

            var schema = new Schema
            {
                Name = item.Key,
                Properties = properties
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
            if (type == "object" && item.Value.Reference != default)
            {
                type = item.Value.Reference.Id;
            }

            var property = new Schema.Property(name, type);
            result.Add(property);
        }

        return result;
    }
}