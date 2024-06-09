using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.NoSqlite;
using Pilotair.Web.Account;
using Pilotair.Web.Projects;

namespace Pilotair.Web;

[Scoped]
public class PilotairStore : NoSqliteStore
{
    public PilotairStore(ProjectAccessor projectAccessor)
        : base(Path.Combine(projectAccessor.Path, Constants.STORES_FOLDER, "pilotair.db"))
    {
        User = GetOrCreate<User>();
    }

    public Collection<User> User { get; init; }
}