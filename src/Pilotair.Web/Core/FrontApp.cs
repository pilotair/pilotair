using System.Reflection;
using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;
using Pilotair.Core.CodeGeneration;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Pilotair.Web;

[Singleton]
public class FrontApp(ISwaggerProvider swaggerProvider)
{
	public void GenerateApiSchema()
	{
		var doc = swaggerProvider.GetSwagger("v1");
		var openApiAdapter = new OpenApiAdapter(doc);
		var schemas = openApiAdapter.Mapping();
		var typescriptConverter = new TypescriptConverter(schemas);
		var result = typescriptConverter.Convert();
		File.WriteAllText("./front-app/src/schema.d.ts", result);
	}
}
