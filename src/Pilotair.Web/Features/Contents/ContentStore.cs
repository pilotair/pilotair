using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.NoSqlite;

namespace Pilotair.Web;

public class ContentStore : NoSqliteStore
{
    public ContentStore(IOptions<PilotairOptions> options)
        : base(Path.Combine(options.Value.DataPath, Constants.STORES_FOLDER, "content.db"))
    {

    }
}