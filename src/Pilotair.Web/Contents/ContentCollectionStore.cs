using Pilotair.Core.Stores.Json;
using Pilotair.Web.Projects;

namespace Pilotair.Web.Contents;

[Scoped]
public class ContentCollectionStore(ProjectAccessor projectAccessor)
    : JsonStore<ContentCollection>(projectAccessor.Path, Constants.CONTENT_COLLECTIONS_FOLDER)
{
}