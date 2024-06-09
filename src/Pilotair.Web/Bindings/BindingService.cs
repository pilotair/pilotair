using Pilotair.Core.Stores.NoSqlite;

namespace Pilotair.Web.Bindings;

[Singleton]
public class BindingService(PilotairStore pilotairStore)
{
    private readonly List<Document<Binding>> cache = [];

    public async Task LoadAsync()
    {
        cache.Clear();
        var all = await pilotairStore.Binding.Query.TakeAsync();

        foreach (var item in all)
        {
            if (item != default) cache.Add(item);
        }
    }

    public string? Match(string host)
    {
        foreach (var item in cache)
        {
            var matched = HostString.MatchesAny(host, [item.Data.Host]);
            if (matched) return item.Data.Project;
        }

        return null;
    }
}