using System.Text;
using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Codes;

namespace Pilotair.Web.Controllers;

public class CodeController(CodeService codeService) : ApiController
{
    [HttpGet]
    public async Task<Code> GetAsync(string path)
    {
        return await codeService.GetCodeAsync(path);
    }

    [HttpPost]
    public async Task PostAsync([FromBody] AddCodeModel model, string folder = "")
    {
        string content = @$"
export function GET(){{
    return ""Get from route '{folder}'"";
}}        
";
        await codeService.Store.SaveFileAsync(folder, content, model.Name);
    }

    [HttpPut]
    public async Task PutAsync([FromBody] UpdateCodeModel model)
    {
        await codeService.Store.SaveFileAsync(model.Path, model.Content);
    }

    [HttpDelete]
    public void Delete(string[] entries, string folder = "")
    {
        codeService.Store.Delete(folder, entries);
    }
}
