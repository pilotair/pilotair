namespace Pilotair.Web;

public class MenuService
{
    public IEnumerable<MenuItem> GetMainMenu()
    {
        var items = new List<MenuItem> {
        new() {
            Order = 1,
            Key="home",
            Label = "Home",
            Icon = "HomeOutlined"
        },
        new() {
            Order = 2,
            Key="files",
            Label = "Files",
            Icon = "PictureOutlined"
        },
        };

        return items;
    }
}