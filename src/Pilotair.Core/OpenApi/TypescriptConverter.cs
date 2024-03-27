using System.Text;
using Microsoft.OpenApi.Models;

namespace Pilotair.Core.OpenApi;

public class TypescriptConverter(OpenApiDocument document)
{
    public string Schemas()
    {
        var builder = new StringBuilder();

        foreach (var schema in document.Components.Schemas)
        {
            var properties = BuildProperties(schema.Value);
            var @interface= BuildInterface(schema.Key, properties);
            builder.AppendLine(@interface);
        }

        return builder.ToString();
    }

    private string BuildInterface(string name, string properties)
    {
        return $"interface {name}{{{properties}}}";
    }

    private string BuildProperties(OpenApiSchema schema)
    {
        var builder = new StringBuilder();
        foreach (var property in schema.Properties)
        {
            builder.Append(property.Key);
            if (property.Value.Nullable) builder.Append('?');
            builder.Append(':');
            var type = property.Value.Type;
            if (type == "object" && property.Value.Reference != default)
            {
                type = property.Value.Reference.Id;
            }
            builder.Append(type);
            builder.Append(';');
        }
        return builder.ToString();
    }
}