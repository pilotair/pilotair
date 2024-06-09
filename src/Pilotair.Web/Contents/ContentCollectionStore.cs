using Pilotair.Core.Stores.Json;
using Pilotair.Web.Projects;

namespace Pilotair.Web.Contents;

[Scoped]
public class ContentCollectionStore(ProjectContext context)
    : JsonStore<ContentCollection>(context.Path, Constants.CONTENT_COLLECTIONS_FOLDER)
{
}