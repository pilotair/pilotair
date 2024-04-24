using System.IO.Compression;
using Microsoft.Extensions.Options;
using Pilotair.Core.Helpers;

namespace Pilotair.Web.Files;

public class FileService
{
    private readonly string basePath;
    private readonly PilotairOptions options;
    protected virtual string Folder { get; } = "files";
    public string BasePath => basePath;

    public FileService(IOptions<PilotairOptions> options)
    {
        this.options = options.Value;
        basePath = Path.Combine(this.options.DataPath, Folder);
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

    public async Task SaveFileAsync(string path, Stream stream, string fileName)
    {
        path = CreateFolder(path);
        path = Path.Combine(path, fileName);
        using var fs = System.IO.File.OpenWrite(path);
        await stream.CopyToAsync(fs);
    }

    public async Task SaveFileAsync(string path, string content, string fileName)
    {
        path = CreateFolder(path);
        path = Path.Combine(path, fileName);
        await System.IO.File.WriteAllTextAsync(path, content);
    }

    public Stream GetFile(string path, string name)
    {
        IoHelper.ShouldBeRelative(path);
        path = Path.Combine(path, name);
        if (!System.IO.File.Exists(path))
        {
            throw new FileNotFoundException();
        }
        return System.IO.File.OpenRead(path);
    }

    public void Delete(string path, string[] entries)
    {
        path = Path.Combine(basePath, path);
        if (!Directory.Exists(path)) return;

        foreach (var item in entries)
        {
            var entryPath = Path.Combine(path, item);
            var isFolder = Directory.Exists(entryPath);
            if (isFolder)
            {
                Directory.Delete(entryPath, true);
            }
            else
            {
                System.IO.File.Delete(entryPath);
            }
        }
    }

    public void ImportFromZip(string path, Stream stream)
    {
        IoHelper.ShouldBeRelative(path);
        using var zipArchive = new ZipArchive(stream);
        path = Path.Combine(basePath, path);
        zipArchive.ExtractToDirectory(path, true);
    }
}