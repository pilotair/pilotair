
using System.Text.Json.Serialization;
using Pilotair.Core.Helpers;
using Pilotair.Core.Project;

namespace Pilotair.Web;

public class WebProject : IProject
{
    public Guid Id { get; init; }

    public required string Name { get; init; }

    public ProjectType Type => ProjectType.Web;
}