using System.Collections.Concurrent;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Project;

public class ProjectService(IOptions<PilotairOptions> options, ILogger<ProjectService> logger)
{
    private readonly string rootPath = Path.Combine(options.Value.DataPath, "projects");
    private readonly ConcurrentDictionary<Guid, ProjectBase> _projects = new();

    public async Task InitAsync()
    {
        IoHelper.EnsureDirectoryExist(rootPath);

        foreach (var dir in Directory.GetDirectories(rootPath))
        {
            try
            {
                var project = await LoadAsync(dir);
                _projects.TryAdd(project.Id, project);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Load project error");
            }
        }
    }

    private static async Task<ProjectBase> LoadAsync(string path)
    {
        var settingPath = Path.Combine(path, IProject.SETTINGS_NAME);
        if (!File.Exists(settingPath)) throw new ProjectNotFoundException(path);
        var project = await JsonHelper.DeserializeAsync<ProjectBase>(settingPath);
        if (project == default) throw new ProjectNotFoundException(path);
        project.Path = path;
        return project;
    }

    public async Task<IProject> CreateAsync(ProjectType type, string name)
    {
        var path = Path.Combine(rootPath, name);
        if (Directory.Exists(path)) throw new ProjectExistException(name);

        var project = new ProjectBase
        {
            Id = Guid.NewGuid(),
            Name = name,
            Type = type,
            Path = path
        };

        await project.SaveAsync();
        _projects.TryAdd(project.Id, project);
        return project;
    }

    public IProject Get(Guid id)
    {
        if (!_projects.TryGetValue(id, out var project))
        {
            throw new ProjectNotFoundException();
        }

        return project;
    }

    public IProject[] All()
    {
        return [.. _projects.Values];
    }

    public void Remove(Guid id)
    {
        _projects.TryRemove(id, out var project);
        if (project?.Path != default)
        {
            Directory.Delete(project.Path, true);
        }
    }
}