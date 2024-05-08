namespace Pilotair.Web.Modules.Http;

public class Response<T>
{
    private readonly T body;
    public Response(T body)
    {
        this.body = body;
    }

    public IDictionary<string, string> Headers { get; set; } = new Dictionary<string, string>();
    public int Status { get; set; } = 200;
}