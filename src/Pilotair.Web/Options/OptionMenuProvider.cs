using Pilotair.Web.Menus;

namespace Pilotair.Web.Options;

[Singleton(typeof(IMenuProvider))]
public class OptionMenuProvider : IMenuProvider
{
    public Task<IEnumerable<MenuItem>> GetMenuItemsAsync(string currentPath = "")
    {
        var result = new List<MenuItem>
        {
            new()
            {
                Order = 30,
                Name="options",
                Type= MenuItem.Types.Options,
            }
        };
        return Task.FromResult<IEnumerable<MenuItem>>(result);
    }
}