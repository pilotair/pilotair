// using Pilotair.Core.Stores.NoSqlite;

// namespace Pilotair.Web.Account;

// [Scoped]
// public class UserService(PilotairStore store)
// {
//     public async Task AddAsync(User user)
//     {
//         await store.User.AddDocumentAsync(user);
//     }

//     public async Task<Document<User>> GetByIdAsync(string id)
//     {
//         return await store.User.GetAsync(id);
//     }

//     public async Task<PagingResult<Document<User>>> GetPagingAsync(PagingQuery query)
//     {
//         var total = await store.User.Query.CountAsync();
//         var result = new PagingResult<Document<User>>(query, total);
//         var list = await store.User.Query.Skip(result.GetSkip()).TakeAsync(result.Size);
//         result.List = list;
//         return result;
//     }
// }