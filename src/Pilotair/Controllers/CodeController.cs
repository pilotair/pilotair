using Microsoft.AspNetCore.Mvc;
using Pilotair.Application;
using Pilotair.Application.Codes;

namespace Pilotair.Controllers;

public class CodeController(CodeService codeService, CodeStore store) : ApiController
{
    [HttpGet]
    public async Task<Code> GetAsync(string name, string folder = "")
    {
        return await codeService.GetCodeAsync(folder, name);
    }

    [HttpPost]
    public async Task PostAsync([FromBody] NewCodeModel model, string folder = "")
    {
        string content = @$"
export function GET(){{
    return ""Get from route '{folder}'"";
}}        
";
        await store.SaveFileAsync(folder, model.Name, content);
    }

    [HttpPost("folder")]
    public void Post(string path)
    {
        store.CreateFolder(path);
    }

    [HttpPut]
    public async Task PutAsync([FromBody] UpdateCodeModel model, string name, string folder = "")
    {
        await store.SaveFileAsync(folder, name, model.Content);
    }

    [HttpDelete]
    public void Delete([FromQuery] string[] paths)
    {
        store.Delete(paths);
    }
}
