using System.Text;

namespace Pilotair.Core.CodeGeneration;

public class TypescriptConverter(IEnumerable<Schema> schemas)
{
    public string Convert()
    {
        var builder = new StringBuilder();
        HandleNamespace(builder, schemas);
        return builder.ToString();
    }

    private static void HandleNamespace(StringBuilder builder, IEnumerable<Schema> schemas)
    {
        var list = schemas.Select(s =>
        {
            var splitIndex = s.Namespace.IndexOf('.');
            var @namespace = string.Empty;

            if (splitIndex > -1)
            {
                @namespace = s.Namespace[..splitIndex];
                s.Namespace = s.Namespace[(splitIndex + 1)..];
            }

            return new KeyValuePair<string, Schema>(@namespace, s);
        });

        foreach (var group in list.GroupBy(g => g.Key))
        {
            var groupItems = group.Select(s => s.Value).ToArray();
            if (string.IsNullOrWhiteSpace(group.Key))
            {
                HandleInterfaces(builder, groupItems);
            }
            else
            {
                builder.Append($"namespace {group.Key}{{");
                HandleNamespace(builder, groupItems);
                builder.Append('}');
            }
        }
    }

    private static void HandleInterfaces(StringBuilder builder, IEnumerable<Schema> schemas)
    {
        foreach (var item in schemas)
        {
            builder.Append($"interface {item.Name}{{");
            HandleProperties(builder, item.Properties);
            builder.Append('}');
        }
    }

    private static void HandleProperties(StringBuilder builder, IEnumerable<Schema.Property> properties)
    {
        foreach (var property in properties)
        {
            builder.Append(property.Name);
            builder.Append(':');
            builder.Append(property.Type);
            builder.Append(';');
        }
    }
}