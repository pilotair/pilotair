using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Hosting;
using Pilotair.Application;
using Pilotair.Application.Accounts;
using Pilotair.Core.Stores.NoSqlite;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddExceptionHandler<ExceptionHandler>();
builder.Services.AddControllers(options =>
{
    options.Conventions.Add(
           new RouteTokenTransformerConvention(new SlugifyParameterTransformer())
    );
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<IContentTypeProvider, FileExtensionContentTypeProvider>();
builder.Services.AddFromAssemblies(typeof(PilotairOptions).Assembly);
builder.Services.AddFromAssemblies(Assembly.GetExecutingAssembly());
builder.Services.AddPilotair(builder.Configuration);
builder.Services.AddAuthentication().AddJwtBearer(options =>
    {
        options.EventsType = typeof(JsonWebTokenEvents);
    }
);

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

builder.Services.Configure<Microsoft.AspNetCore.Mvc.JsonOptions>(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    options.JsonSerializerOptions.Converters.Add(new DictionaryConverter());
});

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});


var app = builder.Build();
app.UseExceptionHandler("/__admin__/error");
app.UsePilotair();

if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.MapFallbackToFile("index.html");
}

// app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

