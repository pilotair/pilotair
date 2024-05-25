using Pilotair.Core.Stores.NoSqlite;

namespace Pilotair.Web.Contents;

public class ContentPagingResult(PagingQuery query, long total)
    : PagingResult<Document<IDictionary<string, object>>>(query, total)
{
}