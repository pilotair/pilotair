using System.Text.Json.Serialization;
using Pilotair.Core.Helpers;

namespace Pilotair.Core.Project;

public interface IProject
{
    const string SETTINGS_NAME = "settings.json";

    Guid Id { get; }

    string Name { get; }

    ProjectType Type { get; }
}