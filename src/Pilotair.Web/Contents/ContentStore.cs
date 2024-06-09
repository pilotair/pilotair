using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.NoSqlite;
using Pilotair.Web.Projects;

namespace Pilotair.Web;

[Scoped]
public class ContentStore : NoSqliteStore
{
    public ContentStore(ProjectAccessor accessor)
        : base(Path.Combine(accessor.Path, Constants.STORES_FOLDER, "content.db"))
    {

    }
}