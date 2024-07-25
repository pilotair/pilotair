using System.ComponentModel.DataAnnotations;

namespace Pilotair.Application;

public class PagingQuery
{
    [Range(1, int.MaxValue)]
    public int Size { get; set; } = 30;

    [Range(1, int.MaxValue)]
    public int Index { get; set; } = 1;
}

public class PagingResult<T>
{
    public PagingResult(PagingQuery query, long total)
    {
        Index = query.Index;
        Size = query.Size;
        Total = total;
    }

    public IEnumerable<T> List { get; set; } = [];
    public int Index { get; init; }
    public int Size { get; init; }
    public long Total { get; init; }

    public long GetSkip()
    {
        return Index * Size - Size;
    }
}