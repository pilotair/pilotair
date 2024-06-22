using System.IO;
using Pilotair.Core.Stores.NoSqlite;
using Pilotair.Web.Projects;

namespace Pilotair.Web;

[Scoped]
public class ContentStore : NoSqliteStore
{
    public ContentStore(ProjectContext context)
        : base(Path.Combine(context.Path, Constants.STORES_FOLDER, "content.db"))
    {

    }
}