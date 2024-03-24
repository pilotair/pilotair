using System.Text.Json.Serialization;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Project;

internal class ProjectBase : IProject
{
    public required Guid Id { get; init; }

    public required string Name { get; init; }

    public required ProjectType Type { get; init; }

    [JsonIgnore]
    public string? Path { get; internal set; }

    public async Task SaveAsync()
    {
        ArgumentNullException.ThrowIfNull(Path);
        IoHelper.EnsureDirectoryExist(Path);
        var settingPath = System.IO.Path.Combine(Path, IProject.SETTINGS_NAME);
        await JsonHelper.SerializeAsync(this, settingPath);
    }
}