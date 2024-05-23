using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.Codes;
using Pilotair.Web.Contents;

namespace Pilotair.Web.Controllers;

public class MenuController(CodeService codeService, ContentCollectionService collectionService) : ApiController
{
    [HttpGet]
    public async Task<IEnumerable<MenuItem>> GetAsync()
    {
        var items = new List<MenuItem> {
            new() {
                Name="files",
                Type=MenuItem.Types.Files,
            },
            new() {
                Name="codes",
                Type=MenuItem.Types.Codes,
                Children=await codeService.GetMenuItemsAsync(),
            },
            new(){
                Name="contents",
                Type= MenuItem.Types.Contents,
                Children=await collectionService.GetMenuItemsAsync()
            },
            new(){
                Name="options",
                Type= MenuItem.Types.Options,
            },
        };

        return items;
    }
}