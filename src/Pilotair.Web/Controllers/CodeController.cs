using System.Text;
using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Codes;

namespace Pilotair.Web.Controllers;

public class CodeController(CodeService codeService) : ApiController
{
    [HttpPost]
    public async Task Post([FromBody] AddRouteModel model, string path = "")
    {
        string content = @$"
export function GET(){{
    return ""Get from route '{path}'"";
}}        
";
        await codeService.SaveFileAsync(path, content, model.Name);
    }
}
