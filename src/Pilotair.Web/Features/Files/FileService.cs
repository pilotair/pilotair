using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.Files;

namespace Pilotair.Web.Files;

public class FileService
{
    private readonly string basePath;
    private readonly PilotairOptions options;
    private readonly FileStore store;
    protected virtual string Folder { get; } = Constants.FILES_FOLDER;
    public string BasePath => basePath;

    public FileService(IOptions<PilotairOptions> options)
    {
        this.options = options.Value;
        basePath = Path.Combine(this.options.DataPath, Folder);
        store = new FileStore(basePath);
    }

    public IEnumerable<Entry> GetFolder(string path)
    {
        return store.GetFolder(path);
    }

    public string CreateFolder(string path)
    {
        return store.CreateFolder(path);
    }

    public async Task SaveFileAsync(string path, Stream stream, string fileName)
    {
        await store.SaveFileAsync(path, stream, fileName);
    }

    public async Task SaveFileAsync(string path, string content, string fileName)
    {
        await store.SaveFileAsync(path, content, fileName);
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