using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pilotair.Application;
using Pilotair.Web.Menus;

namespace Pilotair.Web.Controllers;

[Authorize]
public class MenuController(IEnumerable<IMenuProvider> providers) : ApiController
{
    [HttpGet]
    public async Task<IEnumerable<MenuItem>> GetAsync()
    {
        var items = new List<MenuItem>();
        foreach (var provider in providers)
        {
            var menus = await provider.GetMenuItemsAsync();
            items.AddRange(menus);
        }

        return items;
    }
}