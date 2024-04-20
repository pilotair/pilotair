using Microsoft.AspNetCore.Mvc;

namespace Pilotair.Web.Controllers;

public class MenuController(MenuService menuService) : ApiController
{
    [HttpGet]
    public IEnumerable<MenuItem> Get()
    {
        return menuService.GetMainMenu();
    }
}