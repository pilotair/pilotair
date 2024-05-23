namespace Pilotair.Web.Menus;

public interface IMenuProvider
{
    Task<IEnumerable<MenuItem>> GetMenuItemsAsync(string currentPath = "");
}