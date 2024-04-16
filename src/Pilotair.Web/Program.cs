using Pilotair.Core;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPilotairEngine();
builder.Services.AddSingleton<MenuService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<Pilotair.Web.Endpoint.EndpointDataSource>();

var app = builder.Build();
app.MapFallbackToFile("index.html");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
var dataSource = app.Services.GetService<Pilotair.Web.Endpoint.EndpointDataSource>();
if (dataSource != default)
{
    ((IEndpointRouteBuilder)app).DataSources.Add(dataSource);
}



app.MapControllers();
app.Run();