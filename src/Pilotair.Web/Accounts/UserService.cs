using Microsoft.Extensions.Options;
using Pilotair.Core;
using Pilotair.Core.Stores.NoSqlite;

namespace Pilotair.Web.Accounts;

[Singleton]
public class UserService(AccountStore store, IOptionsMonitor<PilotairOptions> options)
{
    public async Task AddAsync(User user)
    {
        await store.User.AddDocumentAsync(user);
    }

    public async Task<UserModel> GetByUserNameAsync(string name)
    {
        if (name == options.CurrentValue.AdminUser?.UserName)
        {
            return new UserModel
            {
                Id = options.CurrentValue.AdminUser.UserName,
                UserName = options.CurrentValue.AdminUser.UserName,
                Password = options.CurrentValue.AdminUser.Password
            };
        }

        var doc = await store.User.Query.Where("$.userName", name).FirstOrDefaultAsync() ?? throw new NotFoundException<UserService>(name);

        return new UserModel
        {
            Id = doc.Id,
            UserName = doc.Data.UserName,
            Password = doc.Data.Password
        };
    }

    public async Task<PagingResult<Document<User>>> GetPagingAsync(PagingQuery query)
    {
        var total = await store.User.Query.CountAsync();
        var result = new PagingResult<Document<User>>(query, total);
        var list = await store.User.Query.Skip(result.GetSkip()).TakeAsync(result.Size);
        result.List = list;
        return result;
    }
}