using Pilotair.Core.Stores.NoSqlite;

namespace Pilotair.Web.Domains;

public class DomainModel(Document<Domain> document)
{
    public string Name { get; init; } = document.Data.Name;
}