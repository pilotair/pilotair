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
    public void Post(IFormFileCollection files, string? path = "")
    {
        if (path != default) fileService.CreateFolder(path);
        foreach (var file in files)
        {
            using var stream = file.OpenReadStream();
            fileService.SaveFile(path!, stream, file.FileName);
        }
    }
}