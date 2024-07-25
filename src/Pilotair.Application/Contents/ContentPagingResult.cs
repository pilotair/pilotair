using Pilotair.Core.Stores.NoSqlite;

namespace Pilotair.Application.Contents;

public class ContentPagingResult(PagingQuery query, long total)
    : PagingResult<Document<IDictionary<string, object>>>(query, total)
{
}