namespace Pilotair.Core.Runtime;

public interface IModuleStore
{
    string GetCode(Uri uri);
    void AddCode(Uri uri, string code);
}