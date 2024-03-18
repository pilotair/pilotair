using Pilotair.Core;
using Pilotair.Cloud;
using Pilotair.Cloud.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddPilotairCore();
builder.Services.AddSingleton<ProjectService>();
builder.Services.AddOptions<PilotairOptions>()
                .Bind(builder.Configuration.GetSection(PilotairOptions.NAME));

var app = builder.Build();
app.MapFallbackToFile("index.html");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var projectService = app.Services.GetService<ProjectService>();
await projectService!.InitAsync();

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
