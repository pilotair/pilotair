using Pilotair.Web.Codes;

namespace Pilotair.Web;

public class MenuService(CodeService codeService)
{
    public IEnumerable<MenuItem> GetMainMenu()
    {
        var items = new List<MenuItem> {
            new() {
                Order = 1,
                Name="home",
                Type=MenuItem.Types.Home
            },
            new() {
                Order = 2,
                Name="files",
                Type=MenuItem.Types.Files
            },
            new() {
                Order = 3,
                Name="codes",
                Type=MenuItem.Types.Codes,
                Children=codeService.GetMenuItems(),
            },
        };

        return items;
    }
}