
namespace Pilotair.Application.Modules.Http;

public abstract class Response
{
    internal abstract object Body { get; }

    public IDictionary<string, string> Headers { get; set; } = new Dictionary<string, string>();
    public int Status { get; set; } = 200;
}

public class TextResponse : Response
{
    private readonly string body;
    internal override object Body => body;

    public TextResponse(string body)
    {
        this.body = body;
        Headers.Add("ContentType", "text/plain");
    }
}

public class JsonResponse : Response
{
    private readonly object body;
    internal override object Body => body;

    public JsonResponse(object body)
    {
        this.body = body;
        Headers.Add("ContentType", "application/json");
    }
}