using Microsoft.AspNetCore.Mvc;

public class MenuController(MenuService menuService) : ApiController
{
    [HttpGet]
    public IEnumerable<MenuItem> Get()
    {
        return menuService.GetMainMenu();
    }
}