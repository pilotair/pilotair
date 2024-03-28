namespace Pilotair.Core.CodeGeneration;

public interface ISourceAdapter
{
    IEnumerable<Schema> Mapping();
}