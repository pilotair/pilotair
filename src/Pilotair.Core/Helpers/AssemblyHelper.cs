namespace Pilotair.Core.Helpers;

public static class AssemblyHelper
{
    public static string GetEmbeddedResource<T>(string fileName)
    {
        using var stream = typeof(T).Assembly.GetManifestResourceStream(fileName);

        if (stream == default)
        {
            throw new FileNotFoundException(fileName);
        }

        using var reader = new StreamReader(stream);
        return reader.ReadToEnd();
    }
}