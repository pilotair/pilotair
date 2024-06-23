using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Pilotair.Core.CodeGeneration;
using Swashbuckle.AspNetCore.Swagger;

namespace Pilotair.Web;

public static class FrontAppExtensions
{
	public static WebApplication UseFrontApp(this WebApplication app)
	{
		app.UseFile();
		
		if (app.Environment.IsDevelopment())
		{
			var swaggerProvider = app.Services.GetRequiredService<ISwaggerProvider>();
			GenerateSchema(swaggerProvider);
		}

		return app;
	}

	private static void GenerateSchema(ISwaggerProvider swaggerProvider)
	{
		var doc = swaggerProvider.GetSwagger("v1");
		var openApiAdapter = new OpenApiAdapter(doc);
		var schemas = openApiAdapter.Mapping();
		var typescriptConverter = new TypescriptConverter(schemas);
		var result = typescriptConverter.Convert();
		System.IO.File.WriteAllText("./front-app/src/schema.d.ts", result);
	}

	private static void UseFile(this WebApplication app)
	{
		app.UseFileServer(new FileServerOptions
		{
			RequestPath = "/__admin__"
		});
	}
}