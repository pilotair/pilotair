using System.IO;
using Pilotair.Application.Accounts;
using Pilotair.Core.Helpers;

namespace Pilotair.Application;

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