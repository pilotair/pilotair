namespace Pilotair.Core.Stores.Files;

public interface IMimeMapping
{
    bool TryGetContentType(string subpath, out string contentType);

    public EntryType GetEntryType(string contentType)
    {
        var result = EntryType.File;

        if (!string.IsNullOrWhiteSpace(contentType))
        {
            var typeEndIndex = contentType.IndexOf('/');
            if (typeEndIndex > 0)
            {
                var type = contentType[..typeEndIndex];
                switch (type)
                {
                    case "image":
                        result = EntryType.Image;
                        break;
                    case "text":
                        result = EntryType.Text;
                        break;
                    default:
                        break;
                }
            }
        }

        return result;
    }
}