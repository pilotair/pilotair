using System.IO;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.Files;

namespace Pilotair.Web.Files;

[Singleton]
public class FileService
{
    private readonly string basePath;
    private readonly FileStore store;
    protected virtual string Folder { get; } = Constants.FILES_FOLDER;
    public string BasePath => basePath;

    public FileService(IOptions<PilotairOptions> options, IMimeMapping mimeMapping)
    {
        basePath = Path.Combine(options.Value.DataPath, Folder);
        store = new FileStore(basePath, mimeMapping);
    }

    public IEnumerable<Entry> GetFolder(string path)
    {
        return store.GetFolder(path);
    }

    public string CreateFolder(string folder)
    {
        return store.CreateFolder(folder);
    }

    public async Task SaveFileAsync(string folder, string fileName, Stream stream)
    {
        await store.SaveFileAsync(folder, fileName, stream);
    }

    public async Task SaveFileAsync(string folder, string fileName, string content)
    {
        await store.SaveFileAsync(folder, fileName, content);
    }

    public void Delete(string path, string[] entries)
    {
        store.Delete(path, entries);
    }

    public void ImportFromZip(string path, Stream stream)
    {
        store.ImportFromZip(path, stream);
    }
}