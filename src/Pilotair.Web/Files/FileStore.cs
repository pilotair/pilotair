using System.IO;
using System.IO.Compression;
using Microsoft.Extensions.Options;
using Pilotair.Core.Helpers;
using Pilotair.Core.Stores.Files;

namespace Pilotair.Web.Files;

[Singleton]
public class FileStore(IOptions<PilotairOptions> options, IMimeMapping mimeMapping)
    : Core.Stores.Files.FileStore(Path.Combine(options.Value.DataPath, Constants.FILES_FOLDER), mimeMapping)
{

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
}