using Microsoft.Extensions.Options;
using Pilotair.Core.Stores;
using Pilotair.Web.Account;

namespace Pilotair.Web;

public class PilotairStore : Store
{
    public PilotairStore(IOptions<PilotairOptions> options)
        : base(Path.Combine(options.Value.DataPath, "pilotair.db"))
    {
        User = GetOrCreate<User>();
    }

    public Collection<User> User { get; init; }
}