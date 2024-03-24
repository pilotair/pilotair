using Pilotair.Core;
using Pilotair.Cloud;
using Pilotair.Cloud.Services;
using Pilotair.Core.Project;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddPilotairCore(builder.Configuration);
builder.Services.AddSingleton<ContainerService>();
// builder.Services.AddOptions<PilotairOptions>()
//                 .Bind(builder.Configuration.GetSection(PilotairOptions.NAME));

var app = builder.Build();
app.MapFallbackToFile("index.html");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var projectFactory = app.Services.GetService<ProjectFactory>();
await projectFactory!.InitAsync();

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
