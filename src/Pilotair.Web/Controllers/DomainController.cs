using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Domains;

namespace Pilotair.Web.Controllers;

public class DomainController(DomainService domainService)
{

    [HttpGet]
    public async Task<DomainModel[]> GetAsync()
    {
        return await domainService.GetAsync();
    }

    [HttpPost]
    public async Task PostAsync([FromBody] NewDomainModel model)
    {
        await domainService.SaveAsync(model);
    }
}