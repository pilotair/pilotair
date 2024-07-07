using System.IO;
using System.IO.Compression;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Stores.Files;

public class FileStore
{
    private readonly string root;
    private readonly IMimeMapping mimeMapping;

    public string Root => root;

    public FileStore(string root, IMimeMapping mimeMapping)
    {
        IoHelper.EnsureFolderExist(root);
        this.root = root;
        this.mimeMapping = mimeMapping;
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
            result.Add(new File(fileInfo, root, mimeMapping));
        }

        return result;
    }

    public string CreateFolder(string path)
    {
        path = GetValidPath(path);
        IoHelper.EnsureFolderExist(path);
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
        return new File(fileInfo, root, mimeMapping);
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
        var paths = entries.Select(s => Path.Combine(folder, s)).ToArray();
        Delete(paths);
    }

    public void Delete(string[] paths)
    {
        foreach (var item in paths)
        {
            var path = GetValidPath(item);
            var isFolder = Directory.Exists(path);
            if (isFolder)
            {
                if (Directory.Exists(path))
                {
                    Directory.Delete(path, true);
                }
            }
            else
            {
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }
            }
        }
    }

    public async Task ImportFromZipAsync(string folder, Stream stream)
    {
        folder = GetValidPath(folder);
        using var zipArchive = new ZipArchive(stream);
        foreach (var entry in zipArchive.Entries)
        {
            if (entry == null) continue;
            var path = Path.Combine(folder, entry.FullName);
            path = PathHelper.Normalization(path);
            IoHelper.EnsureFileFolderExist(path);
            using var fileStream = System.IO.File.Create(path);
            using var itemStream = entry.Open();
            await itemStream.CopyToAsync(fileStream);
        }
    }

    private string GetValidPath(string path)
    {
        IoHelper.ShouldBeRelative(path);
        path = Path.Combine(root, path);
        path = PathHelper.Normalization(path);
        return path;
    }
}