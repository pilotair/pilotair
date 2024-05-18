using System.Collections.Concurrent;
using Microsoft.Extensions.Options;
using Pilotair.Core.Helpers;

namespace Pilotair.Web.Contents;

[Singleton]
public class ContentService
{
    private readonly string basePath;
    private readonly ConcurrentDictionary<string, ContentCollection> collections = [];

    public ContentService(IOptions<PilotairOptions> options, ContentStore store)
    {
        basePath = Path.Combine(options.Value.DataPath, Constants.CONTENTS_FOLDER);
        IoHelper.EnsureDirectoryExist(basePath);
        var files = Directory.GetFiles(basePath, "*.json");

        foreach (var file in files)
        {
            var content = System.IO.File.ReadAllText(file);
            var collection = JsonHelper.Deserialize<ContentCollection>(content);
            if (collection is not null)
            {
                collections.TryAdd(collection.Name, collection);
            }
        }
    }

    public async void AddCollectionAsync(ContentCollection collection)
    {
        var name = collection.Name;

        if (collections.ContainsKey(name))
        {
            throw new Exception("Collection exist");
        }

        if (collections.TryAdd(name, collection))
        {
            var fileName = Path.Combine(basePath, name + ".json");
            await JsonHelper.SerializeAsync(collection, fileName, default);
        }
    }

    public async void UpdateCollectionAsync(ContentCollection collection)
    {
        var name = collection.Name;

        if (!collections.ContainsKey(name))
        {
            throw new Exception("Collection not exist");
        }
    }
}