
namespace Pilotair.Web.Domains;

public class DomainService(PilotairStore pilotairStore)
{
    public async Task<DomainModel[]> GetAsync()
    {
        var docs = await pilotairStore.Domain.Query.TakeAsync();
        return docs.Select(s => new DomainModel(s)).ToArray();
    }

    public async Task SaveAsync(NewDomainModel model)
    {
        await pilotairStore.Domain.AddDocumentAsync(new Domain
        {
            Name = model.Name
        });
    }
}