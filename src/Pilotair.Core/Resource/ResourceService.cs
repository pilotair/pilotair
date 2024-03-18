using Microsoft.AspNetCore.Http;
using Pilotair.Core.Project;

namespace Pilotair.Core.Resource;

public class ResourceService
{
    private const string FOLDER = "files";
    private readonly WebProject _app;

    public ResourceService()
    {
    }

    public async Task SaveAsync(IFormFileCollection files, string? folder)
    {
        var directory = GetFolder(folder);

        foreach (var item in files)
        {
            var fileName = Path.GetFileName(item.FileName);
            var filePath = Path.Combine(directory, fileName);
            // await _app.SaveFileAsync(item.OpenReadStream(), filePath);
        }
    }

    public IEnumerable<StaticFile> GetFiles(string? folder)
    {
        var directory = GetFolder(folder);
        var paths = Directory.GetFiles(directory);
        var result = new List<StaticFile>();

        foreach (var path in paths)
        {
            var fileInfo = new FileInfo(path);
            result.Add(new StaticFile(fileInfo));
        }

        return result;
    }

    private string GetFolder(string? folder)
    {
        if (folder == default) return FOLDER;
        return Path.Combine(FOLDER, folder);
    }
}