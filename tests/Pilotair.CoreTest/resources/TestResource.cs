namespace Pilotair.CoreTest;

public static class TestResource
{
    private readonly static string basePath = "../../../resources";
    public static string GetText(string name)
    {
        var path = Path.Combine(basePath, name);
        return File.ReadAllText(path);
    }

    public static string GetFolder(string name)
    {
        return Path.Combine(basePath, name);
    }
}