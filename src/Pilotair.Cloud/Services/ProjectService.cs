using System.Collections.Concurrent;
using Microsoft.Extensions.Options;
using Pilotair.Core.Helpers;
using Pilotair.Core.Project;

namespace Pilotair.Cloud.Services;

public class ProjectService(IOptions<PilotairOptions> options, ILogger<ProjectService> logger)
{
    private readonly string rootPath = Path.Combine(options.Value.DataPath, "projects");
    private readonly ConcurrentDictionary<Guid, WebProject> _projects = new();
    public IDictionary<Guid, WebProject> Projects => _projects;

    public async Task InitAsync()
    {
        IoHelper.EnsureDirectoryExist(rootPath);

        foreach (var dir in Directory.GetDirectories(rootPath))
        {
            try
            {
                var project = await WebProject.LoadAsync(dir);
                _projects.TryAdd(project.Id, project);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Load project error");
            }
        }
    }

    public async Task<WebProject> CreateAsync(string name)
    {
        var project = await WebProject.CreateAsync(rootPath, name);
        _projects.TryAdd(project.Id, project);
        return project;
    }
}