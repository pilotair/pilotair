namespace Pilotair.Application.DataModels;

[Singleton]
public class DataModelService(IEnumerable<IComponent> components)
{
    public IComponent[] GetComponents()
    {
        return [.. components];
    }
}