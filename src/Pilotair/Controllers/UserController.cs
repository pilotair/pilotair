// using Microsoft.AspNetCore.Mvc;
// using Pilotair.Core.Stores.NoSqlite;
// using Pilotair.Web.Account;

// namespace Pilotair.Web.Controllers;

// public class UserController(UserService userService) : ApiController
// {

//     [HttpGet("{id}")]
//     public async Task<Document<User>> GetAsync(string id)
//     {
//         return await userService.GetByIdAsync(id);
//     }


//     [HttpGet]
//     public async Task<PagingResult<Document<User>>> GetAsync([FromQuery] PagingQuery query)
//     {
//         return await userService.GetPagingAsync(query);
//     }

//     [HttpPost]
//     public async Task PostAsync(User user)
//     {
//         await userService.AddAsync(user);
//     }


// }