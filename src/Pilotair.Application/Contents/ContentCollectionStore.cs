using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.Json;

namespace Pilotair.Application.Contents;

[Singleton]
public class ContentCollectionStore(IOptions<PilotairOptions> options)
    : JsonStore<ContentCollection>(options.Value.DataPath, Constants.CONTENT_COLLECTIONS_FOLDER)
{
}