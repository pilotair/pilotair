// using Microsoft.AspNetCore.Mvc;
// using Pilotair.Web.Domains;

// namespace Pilotair.Web.Controllers;

// public class DomainController(DomainService domainService) : ApiController
// {
//     [HttpGet]
//     public async Task<DomainModel[]> GetAsync()
//     {
//         return await domainService.GetAsync();
//     }

//     [HttpPost]
//     public async Task PostAsync([FromBody] NewDomainModel model)
//     {
//         await domainService.SaveAsync(model);
//     }

//     [HttpDelete]
//     public async Task DeleteAsync(string name)
//     {
//         await domainService.DeleteAsync(name);
//     }
// }