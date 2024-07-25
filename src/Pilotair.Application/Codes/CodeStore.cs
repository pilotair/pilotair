using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.Files;

namespace Pilotair.Application.Codes;

[Singleton]
public class CodeStore(IOptions<PilotairOptions> options, IMimeMapping mimeMapping)
    : FileStore(Path.Combine(options.Value.DataPath, Constants.CODES_FOLDER), mimeMapping)
{

}