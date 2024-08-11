namespace Pilotair.Menus.Providers;

[Singleton(typeof(IMenuProvider))]
public class FileMenuProvider : IMenuProvider
{
    public Task<IEnumerable<MenuItem>> GetMenuItemsAsync(string currentPath = "")
    {
        var result = new List<MenuItem>
        {
            new()
            {
                Order = 1,
                Name = "files",
                Type = MenuItem.Types.Files,
            }
        };
        return Task.FromResult<IEnumerable<MenuItem>>(result);
    }
}