using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.Extensions.Hosting;
using Pilotair.Core.Stores.NoSqlite;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers(options =>
{
    options.Conventions.Add(
           new RouteTokenTransformerConvention(new SlugifyParameterTransformer())
    );
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddFromAssemblies(Assembly.GetExecutingAssembly());
builder.Services.AddPilotair(builder.Configuration);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();

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
app.UsePilotair();

if (app.Environment.IsDevelopment())
{
    // app.MapFallbackToFile("index.html");
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();
app.Run();

