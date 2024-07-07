using System.IO;
using Pilotair.Core.Helpers;
using Pilotair.Web.Accounts;

namespace Pilotair.Web;

public class PilotairOptions
{
    public const string NAME = "Pilotair";
    private string dataPath = Path.Combine(AppContext.BaseDirectory, Constants.DATA_PATH);

    public required string DataPath
    {
        get => dataPath; init
        {
            if (!Path.IsPathRooted(value))
            {
                value = Path.GetFullPath(value);
            }

            dataPath = PathHelper.Normalization(value);
        }
    }

    public User? AdminUser { get; set; }
}