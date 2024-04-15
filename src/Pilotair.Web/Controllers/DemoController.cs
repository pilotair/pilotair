using Microsoft.AspNetCore.Mvc;

public class DemoController : ApiController
{

    [HttpGet]
    public string Get()
    {
        return "demo";
    }
}