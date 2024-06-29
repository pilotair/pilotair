using System.IO;
using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.NoSqlite;

namespace Pilotair.Web.Accounts;

[Singleton]
public class AccountStore : NoSqliteStore
{
    public AccountStore(IOptions<PilotairOptions> options)
        : base(Path.Combine(options.Value.DataPath, Constants.STORES_FOLDER, "account.db"))
    {
        User = GetOrCreate<User>();
    }

    public Collection<User> User { get; init; }
}