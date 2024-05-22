using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.Json;

namespace Pilotair.Web.Contents;

[Singleton]
public class ContentCollectionStore(IOptions<PilotairOptions> options)
    : JsonStore<ContentCollection>(
        Path.Combine(options.Value.DataPath, Constants.CONTENTS_FOLDER)
    )
{
}