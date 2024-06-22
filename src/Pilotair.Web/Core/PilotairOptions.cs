using System.IO;

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
            
            dataPath = value;
        }
    }
}