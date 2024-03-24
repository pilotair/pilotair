using Microsoft.AspNetCore.Mvc;
using Pilotair.Cloud.Container;
using Pilotair.Cloud.Services;

namespace Pilotair.Cloud.Controllers;

public class ContainerController(ContainerService containerService) : ControllerBase
{
    [HttpGet]
    public async Task Get(ContainerQueryModel query)
    {
        
    }
}