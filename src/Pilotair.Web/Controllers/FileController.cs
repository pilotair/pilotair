using Microsoft.AspNetCore.Mvc;
using Pilotair.Core.Stores.Files;
using Pilotair.Web.Files;

namespace Pilotair.Web.Controllers;

public class FileController(FileService fileService) : ApiController
{
    [HttpGet]
    public IEnumerable<Entry> Get(string? path = "")
    {
        return fileService.GetFolder(path!);
    }

    [HttpPost]
    public async Task PostAsync(IEnumerable<IFormFile> files, string? path = "")
    {
        if (path != default) fileService.CreateFolder(path);
        foreach (var file in files)
        {
            using var stream = file.OpenReadStream();
            await fileService.SaveFileAsync(path!, stream, file.FileName);
        }
    }

    [HttpPost("zip")]
    public void ImportZip(IFormFile file, string? path = "")
    {
        if (path != default) fileService.CreateFolder(path);
        using var stream = file.OpenReadStream();
        fileService.ImportFromZip(path!, stream);
    }

    [HttpDelete]
    public void Delete([FromQuery] string[] entries, string? path = "")
    {
        fileService.Delete(path!, entries);
    }
}