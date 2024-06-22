using System.IO;
using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.Files;
using Pilotair.Web.Projects;

namespace Pilotair.Web.Files;

[Scoped]
public class FileService
{
    private readonly string basePath;
    private readonly FileStore store;
    protected virtual string Folder { get; } = Constants.FILES_FOLDER;
    public string BasePath => basePath;

    public FileService(ProjectContext projectContext)
    {
        if (string.IsNullOrWhiteSpace(projectContext.Path))
        {
            throw new ProjectNotFoundException();
        }
        basePath = Path.Combine(projectContext.Path, Folder);
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

    public async Task SaveFileAsync(string path, string fileName, string content)
    {
        await store.SaveFileAsync(path, fileName, content);
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