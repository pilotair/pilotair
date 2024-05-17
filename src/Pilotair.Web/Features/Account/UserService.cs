using Pilotair.Core.Stores.NoSqlite;
using Pilotair.Web.ViewModels;

namespace Pilotair.Web.Account;

[Singleton]
public class UserService(PilotairStore store)
{
    internal async Task AddAsync(User user)
    {
        await store.User.AddDocumentAsync(user);
    }

    internal async Task<Document<User>> GetByIdAsync(string id)
    {
        return await store.User.GetAsync(id);
    }

    internal async Task<PagingResult<Document<User>>> GetPagingAsync(PagingParams @params)
    {
        var total = await store.User.Query.CountAsync();
        var result = new PagingResult<Document<User>>(@params, total);
        var list = await store.User.Query.Skip(result.GetSkip()).TakeAsync(result.Size);
        result.List = list;
        return result;
    }
}