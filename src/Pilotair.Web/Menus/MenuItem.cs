using System.ComponentModel.DataAnnotations;

namespace Pilotair.Web;

public class MenuItem
{
    public enum Types
    {
        Unknown,
        Files,
        Codes,
        CodeFolder,
        Code,
        Contents,
        ContentCollection,
        Options,
    }
   
    public uint Order { get; set; }

    public required Types Type { get; set; }

    public required string Name { get; init; }

    public string? Display { get; set; }

    public string? Folder { get; init; }

    [Required]
    public string Path
    {
        get
        {
            return System.IO.Path.Combine(Type.ToString(), Folder ?? string.Empty, Name);
        }
    }

    public IEnumerable<MenuItem>? Children { get; set; }
}