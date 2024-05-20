namespace Pilotair.Core.Runtime;

public interface IModuleTransformer
{
    bool Match(Uri uri);

    string Transform(string code);
}