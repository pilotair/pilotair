
using System.Text.Json.Serialization;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Project;

public class WebProject : IProject
{
    public const string SETTINGS_NAME = "settings.json";

    public WebProject(string name, string path)
    {
        Id = Guid.NewGuid();
        Name = name;
        Path = path;
    }

    public Guid Id { get; }

    public string Name { get; }

    [JsonIgnore]
    public string Path { get; }

    // public Task SaveAsync()
    // {

    // }

    // public static WebProject Load(string path)
    // {
    //     path = Path.Combine(path, SETTINGS_NAME);
    //     if (!Directory.Exists(path))
    //     {
    //         throw new ProjectNotFoundException(path);
    //     }

    // }
}