namespace Pilotair.Web.Models;

public class PagingResult<T>
{
    public PagingResult(PagingParams @params, long total)
    {
        Index = @params.Index;
        Size = @params.Size;
        Total = total;
    }

    public IEnumerable<T> List { get; set; } = [];
    public int Index { get; set; }
    public int Size { get; init; }
    public long Total { get; init; }

    public long GetSkip()
    {
        return Index * Size - Size;
    }
}