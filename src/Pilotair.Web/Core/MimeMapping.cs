using Microsoft.AspNetCore.StaticFiles;
using Pilotair.Core.Stores.Files;

namespace Pilotair.Web;

[Singleton(typeof(IMimeMapping))]
public class MimeMapping(IContentTypeProvider contentTypeProvider) : IMimeMapping
{
    public bool TryGetContentType(string subpath, out string contentType)
    {
        return contentTypeProvider.TryGetContentType(subpath, out contentType!);
    }
}