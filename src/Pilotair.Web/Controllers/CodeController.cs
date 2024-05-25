using System.Text;
using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Codes;

namespace Pilotair.Web.Controllers;

public class CodeController(CodeService codeService) : ApiController
{
    [HttpGet]
    public async Task<Code> GetAsync(string name, string folder = "")
    {
        return await codeService.GetCodeAsync(folder, name);
    }

    [HttpPost]
    public async Task PostAsync([FromBody] AddCodeModel model, string name, string folder = "")
    {
        string content = @$"
export function GET(){{
    return ""Get from route '{folder}'"";
}}        
";
        await codeService.Store.SaveFileAsync(folder, model.Name, content);
    }

    [HttpPost("folder")]
    public void Post(string path)
    {
        codeService.Store.CreateFolder(path);
    }

    [HttpPut]
    public async Task PutAsync([FromBody] UpdateCodeModel model, string name, string folder = "")
    {
        await codeService.Store.SaveFileAsync(folder, name, model.Content);
    }

    [HttpDelete]
    public void Delete([FromQuery] string[] paths)
    {
        codeService.Store.Delete(paths);
    }
}
