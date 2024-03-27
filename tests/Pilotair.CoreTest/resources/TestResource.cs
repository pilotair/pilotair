namespace Pilotair.CoreTest;

public static class TestResource
{
    public static string GetText(string name)
    {
        var path = Path.Combine("../../../resources", name);
        return File.ReadAllText(path);
    }
}