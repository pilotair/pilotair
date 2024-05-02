namespace Pilotair.Web.Account;

public class AccountService(PilotairStore store)
{
    public async Task AddUserAsync(User user)
    {
        await store.User.AddDocumentAsync(user);
    }
}