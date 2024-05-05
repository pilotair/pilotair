using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using Pilotair.Core;
using Pilotair.Core.Runtime;
using Pilotair.Web.Account;
using Pilotair.Web.Codes;
using Pilotair.Web.Files;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPilotairEngine();
builder.Services.AddOptions<EngineOptions>().Configure<CodeService>((options, codeService) =>
{
    options.RootPath = codeService.BasePath;
});
builder.Services.AddScoped<Engine>();
builder.Services.AddSingleton<MenuService>();
builder.Services.AddSingleton<FileService>();
builder.Services.AddSingleton<CodeService>();
builder.Services.AddSingleton<FrontApp>();
builder.Services.AddOptions<PilotairOptions>().Bind(builder.Configuration.GetSection(PilotairOptions.NAME));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(options =>
{
    options.CustomSchemaIds(schema => schema.FullName);
});
builder.Services.AddCodesRouting();
builder.Services.AddSingleton<PilotairStore>();
builder.Services.AddSingleton<ContentStore>();
builder.Services.AddSingleton<AccountService>();

builder.Services.Configure<Microsoft.AspNetCore.Mvc.JsonOptions>(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // app.MapFallbackToFile("index.html");
    app.UseSwagger();
    app.UseSwaggerUI();
    var frontApp = app.Services.GetRequiredService<FrontApp>();
    frontApp.GenerateApiSchema();
}

// app.UseHttpsRedirection();
app.UseRouting();
app.UseCodesRouting();

var fileService = app.Services.GetRequiredService<FileService>();

app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(fileService.BasePath)
});

var pilotairOptions = app.Services.GetRequiredService<IOptions<PilotairOptions>>();
Console.WriteLine($"Data root path: {pilotairOptions.Value.DataPath}");

app.UseFileServer(new FileServerOptions
{
    RequestPath = "/__admin__"
});
app.Services.GetServices<PilotairStore>();
app.MapControllers();
app.Run();

