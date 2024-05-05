using System.Text;

namespace Pilotair.Core.CodeGeneration;

public class TypescriptConverter(IEnumerable<Schema> schemas)
{
    public string Convert()
    {
        var builder = new StringBuilder();
        HandleNamespace(builder, schemas, string.Empty);
        return builder.ToString();
    }

    private static void HandleNamespace(StringBuilder builder, IEnumerable<Schema> schemas, string currentNamespace)
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
            else
            {
                @namespace = s.Namespace;
                s.Namespace = string.Empty;
            }

            return new KeyValuePair<string, Schema>(@namespace, s);
        }).ToArray();

        foreach (var group in list.GroupBy(g => g.Key))
        {
            var groupItems = group.Select(s => s.Value).ToArray();
            if (string.IsNullOrWhiteSpace(group.Key))
            {
                HandleSchemas(builder, groupItems, currentNamespace);
            }
            else
            {
                builder.Append($"export namespace {group.Key}{{");
                var @namespace = string.IsNullOrWhiteSpace(currentNamespace)
                    ? group.Key
                    : string.Join('.', [currentNamespace, group.Key]);
                HandleNamespace(builder, groupItems, @namespace);
                builder.Append('}');
            }
        }
    }

    private static void HandleSchemas(StringBuilder builder, IEnumerable<Schema> schemas, string @namespace)
    {
        foreach (var item in schemas)
        {
            var name = StandardizeName(item.Name);

            if (item.Enums.Any())
            {
                builder.Append($"export type {name} = ");
                HandleEnums(builder, item.Enums);
                builder.Append(';');
            }
            else
            {
                builder.Append($"export interface {name}{{");
                HandleProperties(builder, item.Properties, @namespace);
                builder.Append('}');
            }
        }
    }

    private static void HandleProperties(StringBuilder builder, IEnumerable<Schema.Property> properties, string @namespace)
    {

        foreach (var property in properties)
        {
            var type = StandardizeName(property.Type);
            var prefix = @namespace + '.';
            if (type.StartsWith(@namespace + '.'))
            {
                type = type[prefix.Length..];
            }
            builder.Append(property.Name);
            builder.Append(':');
            builder.Append(type);
            builder.Append(';');
        }
    }

    private static void HandleEnums(StringBuilder builder, IEnumerable<object> enums)
    {
        var items = enums.Select(s =>
        {
            if (s is string str)
            {
                return '"' + str + '"';
            }
            else return s;

        });

        builder.Append(string.Join('|', items));
    }

    private static string StandardizeName(string name)
    {
        name = name.Replace("+", string.Empty);
        return name;
    }
}