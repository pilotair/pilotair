using System.Collections;
using Docker.DotNet;
using Docker.DotNet.Models;
using Microsoft.Extensions.Options;
using Pilotair.Cloud.Containers;
using Pilotair.Core.Projects;

namespace Pilotair.Cloud.Services;

public class ContainerService(IOptions<ContainerOptions> options)
{
    private readonly DockerClient client = new DockerClientConfiguration(options.Value.Server).CreateClient();

    public async Task<IEnumerable<ContainerListResponse>> ListAsync(ContainerQueryModel query, CancellationToken token)
    {
        return await client.Containers.ListContainersAsync(new ContainersListParameters
        {
            All = true,
            Filters = new Dictionary<string, IDictionary<string, bool>>
            {
                {
                    "label",new Dictionary<string,bool>{
                        { $"pilotair.id",true}
                    }
                }
            },
        }, token);
    }

    public async Task<ContainerListResponse?> GetAsync(string id, CancellationToken token)
    {
        var response = await client.Containers.ListContainersAsync(new ContainersListParameters
        {
            Filters = new Dictionary<string, IDictionary<string, bool>>
            {
                {
                    "label",new Dictionary<string,bool>{
                        { $"pilotair.id={id}",true}
                    }
                }
            }
        }, token);

        return response.FirstOrDefault();
    }

    public async Task<bool> RunAsync(IProject project, CancellationToken token)
    {
        var container = await GetAsync(project.Id.ToString(), token);
        if (container == default)
        {
            var response = await client.Containers.CreateContainerAsync(new CreateContainerParameters(new Config
            {
                Labels = new Dictionary<string, string> {
                { "pilotair.id", project.Id.ToString() },
            },
                Image = "pilotair-web:latest",
            }), token);
            return await client.Containers.StartContainerAsync(response.ID, new ContainerStartParameters(), token);
        }

        if (container.State != "running")
        {
            return await client.Containers.StartContainerAsync(container.ID, new ContainerStartParameters(), token);
        }
        return true;
    }
}