namespace Pilotair.Web;

public class MenuService
{
    public IEnumerable<MenuItem> GetMainMenu()
    {
        var items = new List<MenuItem> {
        new MenuItem
        {
            Order = 1,
            Label = "Home",
            Icon = "HomeOutlined"
        },
        new MenuItem
        {
            Order = 2,
            Label = "MenuItem1",
            Icon = "HomeOutlined"
        },
        new MenuItem
        {
            Order = 3,
            Label = "MenuItem2",
            Icon = "HomeOutlined"
        }

        };

        return items;
    }
}