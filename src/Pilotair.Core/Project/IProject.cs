using System.Text.Json.Serialization;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Project;

public interface IProject
{
    public const string SETTINGS_NAME = "settings.json";

    public Guid Id { get; }

    public string Name { get; }

    public ProjectType Type { get; }
}