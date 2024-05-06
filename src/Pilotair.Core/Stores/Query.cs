using System.Text;
using Dapper;
using Microsoft.Data.Sqlite;

namespace Pilotair.Core.Stores;

public class Query<T>(SqliteConnection connection, string name) where T : new()
{
    record OrderItem(string Selector, bool Descending);
    private long skip;
    private string[]? exclude;
    private readonly List<OrderItem> order = [];
    private string? where;

    public Query<T> Where(string selector, object value)
    {
        Where(selector, Comparison.Equals, value);
        return this;
    }

    public Query<T> Where(string selector, Comparison comparison, object value)
    {
        string? condition = Query<T>.GetCondition(selector, comparison, value);
        if (!string.IsNullOrWhiteSpace(condition))
        {
            if (string.IsNullOrWhiteSpace(where))
            {
                where = condition;
            }
            else
            {
                where = $"({where} AND {condition})";
            }

        }
        return this;
    }

    public Query<T> OrWhere(string selector, object value)
    {
        OrWhere(selector, Comparison.Equals, value);
        return this;
    }

    public Query<T> OrWhere(string selector, Comparison comparison, object value)
    {
        string? condition = Query<T>.GetCondition(selector, comparison, value);
        if (!string.IsNullOrWhiteSpace(condition))
        {
            if (string.IsNullOrWhiteSpace(where))
            {
                where = condition;
            }
            else
            {
                where = $"({where} OR {condition})";
            }
        }
        return this;
    }

    public Query<T> Order(string selector)
    {
        order.Add(new OrderItem(selector, false));
        return this;
    }

    public Query<T> OrderByDescending(string selector)
    {
        order.Add(new OrderItem(selector, true));
        return this;
    }

    public Query<T> Skip(long count)
    {
        skip = count;
        return this;
    }

    public Query<T> Exclude(params string[] selectors)
    {
        exclude = selectors;
        return this;
    }

    public async Task<Document<T>[]> TakeAsync(long? count = null)
    {
        var sqlBuilder = new StringBuilder();
        sqlBuilder.Append($"SELECT Id,CreationTime,LastWriteTime,");

        if (exclude is null || exclude.Length == 0) sqlBuilder.Append("json(Data) as Data");
        else
        {
            var data = string.Join(',', exclude.Select(s => $"'{s}'"));
            sqlBuilder.Append($"json(jsonb_remove(Data,{data})) as Data");
        }

        sqlBuilder.AppendLine();
        sqlBuilder.AppendLine($"FROM {name}");

        if (where is not null)
        {
            sqlBuilder.AppendLine($"WHERE {where}");
        }

        if (order.Count > 0)
        {
            var orders = order.Select(s =>
            {
                var result = $"jsonb_extract(Data,'{s.Selector}')";

                if (s.Descending)
                {
                    result += " DESC";
                }

                return result;
            });

            sqlBuilder.AppendLine($"ORDER {string.Join(',', orders)}");
        }

        if (skip > 0)
        {
            sqlBuilder.AppendLine($"LIMIT {count ?? -1} OFFSET {skip}");
        }

        var result = await connection.QueryAsync<DocumentModel>(sqlBuilder.ToString());
        return result.Select(s => s.ToDocument<T>()).ToArray();
    }

    public async Task<Document<T>?> FirstOrDefaultAsync()
    {
        return (await TakeAsync(1)).FirstOrDefault();
    }
    public async Task<long> CountAsync()
    {
        var sqlBuilder = new StringBuilder();
        sqlBuilder.AppendLine($"SELECT COUNT(1) FROM {name}");

        if (where is not null)
        {
            sqlBuilder.AppendLine($"WHERE {where}");
        }

        if (skip > 0)
        {
            sqlBuilder.AppendLine($"LIMIT -1 OFFSET {skip}");
        }

        return await connection.QueryFirstAsync<long>(sqlBuilder.ToString());
    }

    private static string? GetCondition(string selector, Comparison comparison, object value)
    {
        string? condition = null;
        selector = $"jsonb_extract(Data,'{selector}')";
        var valueInfo = GetValue(value);

        switch (comparison)
        {
            case Comparison.Equals:
                if (valueInfo.isNull)
                {
                    condition = $"{selector} IS NULL";
                }
                else
                {
                    condition = $"{selector} = {valueInfo.value}";
                }
                break;
            case Comparison.NotEquals:
                if (valueInfo.isNull)
                {
                    condition = $"{selector} IS NOT NULL";
                }
                else
                {
                    condition = $"{selector} != {valueInfo.value}";
                }
                break;
            case Comparison.Greater:
                condition = $"{selector} > {valueInfo.value}";
                break;
            case Comparison.GreaterOrEquals:
                condition = $"{selector} >= {valueInfo.value}";
                break;
            case Comparison.Less:
                condition = $"{selector} < {valueInfo.value}";
                break;
            case Comparison.LessOrEquals:
                condition = $"{selector} < {valueInfo.value}";
                break;
            case Comparison.StartsWith:
                condition = $"{selector} like '{value}%'";
                break;
            case Comparison.Contains:
                condition = $"{selector} like '%{value}%'";
                break;
            default:
                break;
        }

        return condition;
    }

    public static (string value, bool isNull) GetValue(object value)
    {
        if (value is null)
        {
            return ($"NULL", true);
        }
        else if (value is string)
        {
            return ($"'{value}'", false);
        }
        else
        {
            return (value.ToString()!, false);
        }
    }
}

public enum Comparison
{
    Equals,
    NotEquals,
    Greater,
    GreaterOrEquals,
    Less,
    LessOrEquals,
    StartsWith,
    Contains
}