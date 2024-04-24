using Pilotair.Web.Codes;

namespace Pilotair.Web;

public class MenuService(CodeService codeService)
{
    public IEnumerable<MenuItem> GetMainMenu()
    {
        var items = new List<MenuItem> {
            new() {
                Order = 1,
                Name="features",
                Type=MenuItem.Types.Features
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
            new(){
                Order = 4,
                Name="contents",
                Type= MenuItem.Types.Contents
            },
            new(){
                Order = 5,
                Name="options",
                Type= MenuItem.Types.Options
            },
        };

        return items;
    }
}