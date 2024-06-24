using Microsoft.AspNetCore.Mvc;
using Pilotair.Core.Stores.Files;
using Pilotair.Web.Files;

namespace Pilotair.Web.Controllers;

public class FileController(FileService fileService) : ApiController
{
    [HttpGet]
    public IEnumerable<Entry> Get(string? folder = "")
    {
        return fileService.GetFolder(folder!);
    }

    [HttpPost]
    public async Task PostAsync(IEnumerable<IFormFile> files, [FromQuery] string folder = "")
    {
        if (!string.IsNullOrWhiteSpace(folder)) fileService.CreateFolder(folder);

        foreach (var file in files)
        {
            using var stream = file.OpenReadStream();
            await fileService.SaveFileAsync(folder, file.FileName, stream);
        }
    }

    [HttpPost("zip")]
    public void ImportZip(IFormFile file, string folder = "")
    {
        if (!string.IsNullOrWhiteSpace(folder)) fileService.CreateFolder(folder);
        using var stream = file.OpenReadStream();
        fileService.ImportFromZip(folder!, stream);
    }

    [HttpDelete]
    public void Delete([FromQuery] string[] entries, string? folder = "")
    {
        fileService.Delete(folder!, entries);
    }
}