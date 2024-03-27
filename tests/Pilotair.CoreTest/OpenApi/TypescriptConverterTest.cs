using Microsoft.OpenApi.Readers;
using Pilotair.Core.OpenApi;

namespace Pilotair.CoreTest;

[TestClass]
public class TypescriptConverterTest
{

    [TestMethod]
    public void Schemas()
    {
        var reader = new OpenApiStringReader();
        var docJson = TestResource.GetText("swagger.json");
        var doc = reader.Read(docJson, out _);
        var result = new TypescriptConverter(doc).Schemas();
    }
}