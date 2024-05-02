namespace Pilotair.Web;

public class PilotairOptions
{
    public const string NAME = "Pilotair";
    public const string DATA_PATH = "data";
    private string dataPath = Path.Combine(AppContext.BaseDirectory, DATA_PATH);

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