using Pilotair.Task;
using Pilotair.Core;
using Pilotair.Core.Code;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddOptions<CodeOptions>().Bind(builder.Configuration.GetSection("Code"));
builder.Services.AddSingleton<CodeExecutor>();
builder.Services.AddPilotairCore(builder.Configuration);
builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();
