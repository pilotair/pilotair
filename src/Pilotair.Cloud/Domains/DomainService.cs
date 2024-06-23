

// namespace Pilotair.Web.Domains;

// [Singleton]
// public class DomainService(PilotairStore pilotairStore)
// {
//     internal async Task<DomainModel[]> GetAsync()
//     {
//         var docs = await pilotairStore.Domain.Query.TakeAsync();
//         return docs.Select(s => new DomainModel(s)).ToArray();
//     }

//     internal async Task SaveAsync(NewDomainModel model)
//     {
//         await pilotairStore.Domain.AddDocumentAsync(new Domain
//         {
//             Name = model.Name
//         });
//     }

//     internal async Task DeleteAsync(string name)
//     {
//         var domains = await pilotairStore.Domain.Query.Where("$.name", name).TakeAsync();
//         if (domains == default) return;
//         foreach (var domain in domains)
//         {
//             await pilotairStore.Domain.RemoveDocumentAsync(domain.Id);
//         }
//     }
// }