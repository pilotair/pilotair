using System.Text.Json.Serialization;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Projects;

public class Project
{
    public const string SETTINGS_NAME = "settings.json";

    public required Guid Id { get; init; }

    public required string Name { get; init; }

    [JsonIgnore]
    public string? Path { get; set; }

    public async Task SaveAsync()
    {
        ArgumentNullException.ThrowIfNull(Path);
        IoHelper.EnsureDirectoryExist(Path);
        var settingPath = System.IO.Path.Combine(Path, SETTINGS_NAME);
        await JsonHelper.SerializeAsync(this, settingPath);
    }

    public void Remove()
    {
        ArgumentNullException.ThrowIfNull(Path);
        Directory.Delete(Path, true);
    }

    public static async Task<Project> LoadAsync(string path) 
    {
        var settingPath = System.IO.Path.Combine(path, SETTINGS_NAME);
        if (!File.Exists(settingPath)) throw new ProjectNotFoundException(path);
        var project = await JsonHelper.DeserializeAsync<Project>(settingPath);
        if (project == default) throw new ProjectNotFoundException(path);
        project.Path = path;
        return project;
    }
}