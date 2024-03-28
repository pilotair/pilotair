using Microsoft.OpenApi.Readers;
using Pilotair.Core.CodeGeneration;

namespace Pilotair.CoreTest;

[TestClass]
public class TypescriptConverterTest
{

    [TestMethod]
    public void Convert()
    {
        var reader = new OpenApiStringReader();
        var docJson = TestResource.GetText("swagger.json");
        var doc = reader.Read(docJson, out _);
        var result = new OpenApiAdapter(doc).Mapping();
        var tsCode = new TypescriptConverter(result).Convert();
    }
}