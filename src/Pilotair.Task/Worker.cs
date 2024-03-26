using Pilotair.Core.Code;

namespace Pilotair.Task;

public class Worker(CodeExecutor codeExecutor, ILogger<Worker> logger) : BackgroundService
{
    protected override async System.Threading.Tasks.Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var result = await codeExecutor.ExecuteAsync("./main.js");
        var aa= result.Get("data");
    }
}
