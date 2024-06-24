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
        IoHelper.ShouldBeRelative(path);
        path = Path.Combine(root, path);
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
        IoHelper.ShouldBeRelative(path);
        path = Path.Combine(root, path);
        IoHelper.EnsureDirectoryExist(path);
        return path;
    }

    public async Task SaveFileAsync(string folder, string name, Stream stream)
    {
        folder = CreateFolder(folder);
        folder = Path.Combine(folder, name);
        using var fs = System.IO.File.OpenWrite(folder);
        await stream.CopyToAsync(fs);
    }

    public async Task SaveFileAsync(string folder, string name, string content)
    {
        folder = CreateFolder(folder);
        folder = Path.Combine(folder, name);
        await System.IO.File.WriteAllTextAsync(folder, content);
    }

    public async Task SaveFileAsync(string path, string content)
    {
        if (!Path.IsPathRooted(path)) path = Path.Combine(root, path);
        await System.IO.File.WriteAllTextAsync(path, content);
    }

    public File GetFile(string folder, string name)
    {
        var path = Path.Combine(folder, name);
        return GetFile(path);
    }

    public File GetFile(string path)
    {
        if (!Path.IsPathRooted(path))
        {
            path = Path.Combine(root, path);
        }

        if (!System.IO.File.Exists(path))
        {
            throw new FileNotFoundException();
        }

        var fileInfo = new FileInfo(path);
        return new File(fileInfo, root);
    }

    public async Task<string> ReadTextAsync(string folder, string name)
    {
        var path = Path.Combine(folder, name);
        return await ReadTextAsync(path);
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
        folder = Path.Combine(root, folder);
        if (!Directory.Exists(folder)) return;

        foreach (var item in entries)
        {
            var entryPath = Path.Combine(folder, item);
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

    public void Delete(string[] paths)
    {
        foreach (var item in paths)
        {
            var entryPath = Path.Combine(root, item);
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
        IoHelper.ShouldBeRelative(folder);
        using var zipArchive = new ZipArchive(stream);
        folder = Path.Combine(root, folder);
        zipArchive.ExtractToDirectory(folder, true);
    }
}