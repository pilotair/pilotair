using Pilotair.Core;
using Pilotair.Web.Files;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPilotairEngine();
builder.Services.AddSingleton<MenuService>();
builder.Services.AddSingleton<FileService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<Pilotair.Web.Endpoint.EndpointDataSource>();

var app = builder.Build();

// Configure the HTTP request pipeline.
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

app.MapControllers();
app.Run();