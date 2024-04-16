using Microsoft.Extensions.Options;
using Pilotair.Core.Helpers;

namespace Pilotair.Web.Files;

public class FileService
{
    private readonly string basePath;
    private readonly PilotairOptions options;

    public FileService(IOptions<PilotairOptions> options)
    {
        this.options = options.Value;
        basePath = Path.Combine(this.options.DataPath, "files");
        IoHelper.EnsureDirectoryExist(basePath);
    }

    public IEnumerable<Entry> GetFolder(string path)
    {
        var result = new List<Entry>();
        IoHelper.ShouldBeRelative(path);
        path = Path.Combine(basePath, path);
        var directories = Directory.GetDirectories(path);

        foreach (var directory in directories)
        {
            var directoryInfo = new DirectoryInfo(directory);
            result.Add(new Folder(directoryInfo));
        }

        var files = Directory.GetFiles(path);

        foreach (var file in files)
        {
            var fileInfo = new FileInfo(file);
            result.Add(new File(fileInfo));
        }

        return result;
    }

    public string CreateFolder(string path)
    {
        IoHelper.ShouldBeRelative(path);
        path = Path.Combine(basePath, path);
        IoHelper.EnsureDirectoryExist(path);
        return path;
    }

    public async void SaveFile(string path, Stream stream, string fileName)
    {
        path = CreateFolder(path);
        path = Path.Combine(path, fileName);
        using var fs = System.IO.File.OpenWrite(path);
        await stream.CopyToAsync(fs);
    }
}