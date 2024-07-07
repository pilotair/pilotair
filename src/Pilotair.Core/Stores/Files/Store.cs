using System.IO;
using System.IO.Compression;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores.Files;

public class FileStore
{
    private readonly string root;

    public string Root => root;

    public FileStore(string root)
    {
        IoHelper.EnsureDirectoryExist(root);
        this.root = root;
    }

    public IEnumerable<Entry> GetFolder(string path)
    {
        var result = new List<Entry>();
        path = GetValidPath(path);
        var directories = Directory.GetDirectories(path);

        foreach (var directory in directories)
        {
            var directoryInfo = new DirectoryInfo(directory);
            result.Add(new Folder(directoryInfo, root));
        }

        var files = Directory.GetFiles(path);

        foreach (var file in files)
        {
            var fileInfo = new FileInfo(file);
            result.Add(new File(fileInfo, root));
        }

        return result;
    }

    public string CreateFolder(string path)
    {
        path = GetValidPath(path);
        IoHelper.EnsureDirectoryExist(path);
        return path;
    }

    public async Task SaveFileAsync(string folder, string name, Stream stream)
    {
        folder = CreateFolder(folder);
        var path = Path.Combine(folder, name);
        using var fs = System.IO.File.OpenWrite(path);
        await stream.CopyToAsync(fs);
    }

    public async Task SaveFileAsync(string folder, string name, string content)
    {
        folder = CreateFolder(folder);
        var path = Path.Combine(folder, name);
        await System.IO.File.WriteAllTextAsync(path, content);
    }

    public File GetFile(string folder, string name)
    {
        var path = Path.Combine(folder, name);
        return GetFile(path);
    }

    public File GetFile(string path)
    {
        path = GetValidPath(path);

        if (!System.IO.File.Exists(path))
        {
            throw new FileNotFoundException();
        }

        var fileInfo = new FileInfo(path);
        return new File(fileInfo, root);
    }

    public async Task<string> ReadTextAsync(string path)
    {
        path = Path.Combine(root, path);
        if (!System.IO.File.Exists(path))
        {
            throw new FileNotFoundException();
        }

        return await System.IO.File.ReadAllTextAsync(path);
    }

    public void Delete(string folder, string[] entries)
    {
        folder = GetValidPath(folder);
        if (!Directory.Exists(folder)) return;
        var paths = entries.Select(s => Path.Combine(folder, s)).ToArray();
        Delete(paths);
    }

    public void Delete(string[] paths)
    {
        foreach (var item in paths)
        {
            var entryPath = GetValidPath(item);
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

    public void ImportFromZip(string folder, Stream stream)
    {
        var path = GetValidPath(folder);
        using var zipArchive = new ZipArchive(stream);
        zipArchive.ExtractToDirectory(path, true);
    }

    private string GetValidPath(string path)
    {
        IoHelper.ShouldBeRelative(path);
        path = Path.Combine(root, path);
        path = PathHelper.Normalization(path);
        return path;
    }
}