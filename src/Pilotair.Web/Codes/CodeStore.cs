using System.IO;
using Microsoft.Extensions.Options;
using Pilotair.Core.Stores.Files;

namespace Pilotair.Web.Codes;

[Singleton]
public class CodeStore(IOptions<PilotairOptions> options)
    : FileStore(Path.Combine(options.Value.DataPath, Constants.CODES_FOLDER))
{

}