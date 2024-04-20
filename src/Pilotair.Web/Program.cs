using System.Text.Json;
using Microsoft.Extensions.Options;
using Pilotair.Core;
using Pilotair.Web.Codes;
using Pilotair.Web.Files;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPilotairEngine();
builder.Services.AddSingleton<MenuService>();
builder.Services.AddSingleton<FileService>();
builder.Services.AddSingleton<CodeService>();
builder.Services.AddOptions<PilotairOptions>().Bind(builder.Configuration.GetSection(PilotairOptions.NAME));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<Pilotair.Web.Endpoint.EndpointDataSource>();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapFallbackToFile("index.html");
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseFileServer(new FileServerOptions
{
    RequestPath = "/__admin__"
});
// app.UseHttpsRedirection();
app.UseRouting();
var dataSource = app.Services.GetService<Pilotair.Web.Endpoint.EndpointDataSource>();
if (dataSource != default)
{
    ((IEndpointRouteBuilder)app).DataSources.Add(dataSource);
}

var pilotairOptions = app.Services.GetService<IOptions<PilotairOptions>>();
Console.WriteLine($"Data root path: {pilotairOptions?.Value.DataPath}");

app.MapControllers();
app.Run();

