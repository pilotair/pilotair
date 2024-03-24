using System.Text.Json.Serialization;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Project;

public class ProjectBase : IProject
{
    public required Guid Id { get; init; }

    public required string Name { get; init; }

    public required ProjectType Type { get; init; }

    [JsonIgnore]
    public string? Path { get; private set; }

    public async Task SaveAsync(string? path)
    {
        if (path == default) path = Path;
        ArgumentNullException.ThrowIfNull(path);
        IoHelper.EnsureDirectoryExist(path);
        var settingPath = System.IO.Path.Combine(path, IProject.SETTINGS_NAME);
        await JsonHelper.SerializeAsync(this, settingPath);
    }

    public static async Task<IProject> LoadAsync(string path)
    {
        var settingPath = System.IO.Path.Combine(path, IProject.SETTINGS_NAME);
        if (!File.Exists(settingPath)) throw new ProjectNotFoundException(path);
        var project = await JsonHelper.DeserializeAsync<ProjectBase>(settingPath);
        if (project == default) throw new ProjectNotFoundException(path);
        project.Path = path;
        return project;
    }
}