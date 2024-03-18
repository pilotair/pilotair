using Microsoft.Extensions.Options;
using Pilotair.Core.Helpers;

namespace Pilotair.Core;


public class PilotairData
{
    private readonly PilotairOptions _pilotairOptions;

    public PilotairData(IOptions<PilotairOptions> options)
    {
        _pilotairOptions = options.Value;
        IoHelper.EnsureDirectoryExist(_pilotairOptions.DataPath);
        Path = _pilotairOptions.DataPath;
    }

    public string Path { get; init; }
}