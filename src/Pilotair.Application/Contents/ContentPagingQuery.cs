namespace Pilotair.Application.Contents;

public class ContentPagingQuery : PagingQuery
{
    public required string Collection { get; init; }
}