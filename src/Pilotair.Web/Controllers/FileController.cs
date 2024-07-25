using Microsoft.AspNetCore.Mvc;
using Pilotair.Core.Stores.Files;

namespace Pilotair.Web.Controllers;

public class FileController(Application.Files.FileStore store) : ApiController
{
    [HttpGet]
    public IEnumerable<Entry> Get(string? folder = "")
    {
        return store.GetFolder(folder!);
    }

    [HttpPost]
    public async Task PostAsync(IEnumerable<IFormFile> files, [FromQuery] string folder = "")
    {
        if (!string.IsNullOrWhiteSpace(folder)) store.CreateFolder(folder);

        foreach (var file in files)
        {
            using var stream = file.OpenReadStream();
            await store.SaveFileAsync(folder, file.FileName, stream);
        }
    }

    [HttpPost("zip")]
    public async Task ImportZipAsync(IFormFile file, string folder = "")
    {
        if (!string.IsNullOrWhiteSpace(folder)) store.CreateFolder(folder);
        using var stream = file.OpenReadStream();
        await store.ImportFromZipAsync(folder!, stream);
    }

    [HttpPut("move")]
    public void Move(string path, string newPath)
    {
        store.Move(path, newPath);
    }

    [HttpDelete]
    public void Delete([FromQuery] string[] entries, string? folder = "")
    {
        store.Delete(folder!, entries);
    }
}