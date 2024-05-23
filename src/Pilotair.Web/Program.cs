using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using Pilotair.Web.Codes;
using Pilotair.Web.Files;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient();
builder.Services.AddOptions<PilotairOptions>().Bind(builder.Configuration.GetSection(PilotairOptions.NAME));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers(options =>
{
    options.Conventions.Add(
           new RouteTokenTransformerConvention(new SlugifyParameterTransformer())
    );
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddFromAssemblies(Assembly.GetExecutingAssembly());

string GetName(Type schema)
{
    var name = schema.Name;
    var index = name.IndexOf('`');
    if (index > 0)
    {
        name = name[..index];
    }
    if (schema.ReflectedType != default)
    {
        name = schema.ReflectedType.Name + name;
    }

    foreach (var item in schema.GenericTypeArguments)
    {
        name += GetName(item);
    }

    return name;
};
builder.Services.AddSwaggerGen(options =>
{
    options.CustomSchemaIds(schema =>
    {
        var name = GetName(schema);
        return schema.Namespace + '.' + name;
    });
});
builder.Services.AddCodesRouting();

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

