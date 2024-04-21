using Pilotair.Core.CodeGeneration;
using Swashbuckle.AspNetCore.Swagger;

namespace Pilotair.Web;

public class FrontApp(ISwaggerProvider swaggerProvider)
{
    public void GenerateApiSchema()
    {
        var doc = swaggerProvider.GetSwagger("v1");
        var openApiAdapter = new OpenApiAdapter(doc);
        var schemas = openApiAdapter.Mapping();
        var typescriptConverter = new TypescriptConverter(schemas);
        var result = typescriptConverter.Convert();
    }
}