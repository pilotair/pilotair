
using System.Text.Json.Serialization;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Project;

public class WebProject
{

    [JsonConstructor]
    internal WebProject()
    {
        
    }
    public const string SETTINGS_NAME = "settings.json";

    public required Guid Id { get; init; }

    public required string Name { get; init; }

    [JsonIgnore]
    public string? Path { get; private set; }

    public async Task SaveAsync()
    {
        ArgumentNullException.ThrowIfNull(Path);
        var settingPath = System.IO.Path.Combine(Path, SETTINGS_NAME);
        await JsonHelper.SerializeAsync(this, settingPath);
    }

    public static async Task<WebProject> CreateAsync(string rootPath, string name)
    {
        var path = System.IO.Path.Combine(rootPath, name);
        var project = new WebProject
        {
            Id = Guid.NewGuid(),
            Name = name,
            Path = path
        };
        IoHelper.EnsureDirectoryExist(path);
        await project.SaveAsync();
        return project;
    }

    public static async Task<WebProject> LoadAsync(string path)
    {
        var settingPath = System.IO.Path.Combine(path, SETTINGS_NAME);
        if (!File.Exists(settingPath)) throw new ProjectNotFoundException(path);
        var project = await JsonHelper.DeserializeAsync<WebProject>(settingPath);
        if (project == default) throw new ProjectNotFoundException(path);
        project.Path = path;
        return project;
    }
}