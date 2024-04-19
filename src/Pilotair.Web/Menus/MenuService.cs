namespace Pilotair.Web;

public class MenuService
{
    public IEnumerable<MenuItem> GetMainMenu()
    {
        var items = new List<MenuItem> {
        new() {
            Order = 1,
            Name="home",
            Label = "Home",
            Icon = "HomeOutlined"
        },
        new() {
            Order = 2,
            Name="files",
            Label = "Files",
            Icon = "PictureOutlined"
        },
        };

        return items;
    }
}