using System.Collections.Concurrent;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Project;

public class ProjectFactory(IOptions<PilotairOptions> options, ILogger<ProjectFactory> logger)
{
    private readonly string rootPath = Path.Combine(options.Value.DataPath, "projects");
    private readonly ConcurrentDictionary<Guid, IProject> _projects = new();
    public IDictionary<Guid, IProject> Projects => _projects;

    public async Task InitAsync()
    {
        IoHelper.EnsureDirectoryExist(rootPath);

        foreach (var dir in Directory.GetDirectories(rootPath))
        {
            try
            {
                var project = await ProjectBase.LoadAsync(dir);
                _projects.TryAdd(project.Id, project);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Load project error");
            }
        }
    }

    public async Task<IProject> CreateAsync(ProjectType type, string name)
    {
        var path = Path.Combine(rootPath, name);
        var project = new ProjectBase
        {
            Id = Guid.NewGuid(),
            Name = name,
            Type = type
        };
        await project.SaveAsync(path);
        return project;
    }
}