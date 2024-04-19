using System.Collections;
using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Files;

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
}