using System.Collections.Concurrent;
using Microsoft.Extensions.Options;
using Pilotair.Core.Helpers;
using Pilotair.Core.Project;
using Pilotair.Core.Services;

namespace Pilotair.Cloud.Services;

public class ProjectService(JsonService jsonService, IOptions<PilotairOptions> options)
{
    private readonly string rootPath = Path.Combine(options.Value.DataPath, "projects");
    private readonly ConcurrentDictionary<Guid, WebProject> _projects = new();
    private readonly JsonService jsonService = jsonService;

    public async Task InitAsync()
    {
        IoHelper.EnsureDirectoryExist(rootPath);
        
        foreach (var dir in Directory.GetDirectories(rootPath))
        {
            var settingPath = Path.Combine(dir, WebProject.SETTINGS_NAME);
            if (!File.Exists(settingPath)) continue;
            var project = await jsonService.DeserializeAsync<WebProject>(settingPath);
            if (project == default) throw new ProjectNotFoundException();
            _projects.TryAdd(project.Id, project);
        }
    }

    public async Task<WebProject> CreateAsync(string name)
    {
        var path = Path.Combine(rootPath, name);
        var project = new WebProject(name, path);
        IoHelper.EnsureDirectoryExist(path);
        await SaveAsync(project);
        _projects.TryAdd(project.Id, project);
        return project;
    }

    public async Task SaveAsync(WebProject project)
    {
        var settingPath = Path.Combine(project.Path, WebProject.SETTINGS_NAME);
        await jsonService.SerializeAsync(project, settingPath);
    }
}