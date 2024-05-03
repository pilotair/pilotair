using Microsoft.Extensions.Options;
using Pilotair.Core.Stores;

namespace Pilotair.Web;

public class ContentStore : Store
{
    public ContentStore(IOptions<PilotairOptions> options)
        : base(Path.Combine(options.Value.DataPath, "content.db"))
    {
        
    }
}