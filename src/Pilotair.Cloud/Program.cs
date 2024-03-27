using Pilotair.Core;
using Pilotair.Cloud;
using Pilotair.Cloud.Services;
using Pilotair.Core.Project;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<ProjectService>();
builder.Services.AddSingleton<ContainerService>();

var app = builder.Build();
app.MapFallbackToFile("index.html");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var projectFactory = app.Services.GetService<ProjectService>();
await projectFactory!.InitAsync();

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
