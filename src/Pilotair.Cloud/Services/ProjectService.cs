using System.Collections.Concurrent;
using Microsoft.Extensions.Options;
using Pilotair.Core.Helpers;
using Pilotair.Core.Projects;
using Pilotair.Web;

namespace Pilotair.Cloud.Services;

public class ProjectService(IOptions<PilotairCloudOptions> options, ILogger<ProjectService> logger)
{
    private readonly string rootPath = Path.Combine(options.Value.DataPath, "projects");
    private readonly ConcurrentDictionary<Guid, Project> _projects = new();

    public async Task InitAsync()
    {
        IoHelper.EnsureDirectoryExist(rootPath);

        foreach (var dir in Directory.GetDirectories(rootPath))
        {
            try
            {
                var project = await Project.LoadAsync<WebProject>(dir);
                _projects.TryAdd(project.Id, project);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Load project error");
            }
        }
    }

    public async Task<IProject> CreateAsync(string name)
    {
        var path = Path.Combine(rootPath, name);
        if (Directory.Exists(path)) throw new ProjectExistException(name);

        var project = new WebProject
        {
            Id = Guid.NewGuid(),
            Name = name,
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
        project?.Remove();
    }
}