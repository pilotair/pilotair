using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.NoSqlite;
using Pilotair.Web.Account;

namespace Pilotair.Web;

[Singleton]
public class PilotairStore : NoSqliteStore
{
    public PilotairStore(IOptions<PilotairOptions> options)
        : base(Path.Combine(options.Value.DataPath, Constants.STORES_FOLDER, "pilotair.db"))
    {
        User = GetOrCreate<User>();
    }

    public Collection<User> User { get; init; }
}