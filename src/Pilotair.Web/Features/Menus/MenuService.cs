using Pilotair.Web.Codes;

namespace Pilotair.Web;

[Scoped]
public class MenuService(CodeService codeService)
{
    public IEnumerable<MenuItem> GetMainMenu()
    {
        var items = new List<MenuItem> {
            new() {
                Name="files",
                Type=MenuItem.Types.Files,
            },
            new() {
                Name="codes",
                Type=MenuItem.Types.Codes,
                Children=codeService.GetMenuItems(),
            },
            new(){
                Name="contents",
                Type= MenuItem.Types.Contents,
            },
            new(){
                Name="options",
                Type= MenuItem.Types.Options,
            },
        };

        return items;
    }
}