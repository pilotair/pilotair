using Microsoft.AspNetCore.Mvc;
using Pilotair.Web.DataModels;

namespace Pilotair.Web.Controllers;

public class DataModelController : ApiController
{
    [HttpGet("[Action]")]
    public string[] Controls()
    {
        return Enum.GetNames<ControlTypes>();
    }
}