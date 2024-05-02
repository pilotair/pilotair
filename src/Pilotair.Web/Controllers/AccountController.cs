using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Account;

namespace Pilotair.Web.Controllers;

public class AccountController(AccountService accountService) : ApiController
{
    [HttpPost]
    public async Task PostAsync(User user)
    {
        await accountService.AddUserAsync(user);
    }
}