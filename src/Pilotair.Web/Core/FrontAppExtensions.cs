using Microsoft.AspNetCore.Builder;
using Pilotair.Core.CodeGeneration;
using Swashbuckle.AspNetCore.Swagger;

namespace Pilotair.Web;

public static class FrontAppExtensions
{
	public static WebApplication UseFrontApp(this WebApplication app)
	{
		var swaggerProvider = app.Services.GetRequiredService<ISwaggerProvider>();
		var doc = swaggerProvider.GetSwagger("v1");
		var openApiAdapter = new OpenApiAdapter(doc);
		var schemas = openApiAdapter.Mapping();
		var typescriptConverter = new TypescriptConverter(schemas);
		var result = typescriptConverter.Convert();
		System.IO.File.WriteAllText("./front-app/src/schema.d.ts", result);
		return app;
	}
}