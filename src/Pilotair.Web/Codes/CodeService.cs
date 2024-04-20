using Microsoft.Extensions.Options;
using Pilotair.Core.Helpers;
using Pilotair.Web.Files;

namespace Pilotair.Web.Codes;

public class CodeService : FileService
{
    protected override string Folder => "codes";

    public CodeService(IOptions<PilotairOptions> options) : base(options)
    {
    }

    public IEnumerable<MenuItem> GetMenuItems(string currentPath = "")
    {
        var items = new List<MenuItem>();
        var entries = GetFolder(currentPath);

        foreach (var entry in entries)
        {
            var item = new MenuItem
            {
                Name = entry.Name,
                Order = default,
                Type = entry.IsFolder ? MenuItem.Types.CodeFolder : MenuItem.Types.Code,
            };

            items.Add(item);

            if (entry.IsFolder)
            {
                var path = entry.Name;
                item.Children = GetMenuItems(path);
            }
        }

        return items;
    }
}