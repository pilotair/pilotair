using System.Collections.Concurrent;
using Microsoft.AspNetCore.Routing.Patterns;
using Microsoft.Extensions.Primitives;

namespace Pilotair.Web.Endpoint;

public class CodeEndpointDataSource : EndpointDataSource
{
    private readonly ConcurrentDictionary<string, Microsoft.AspNetCore.Http.Endpoint> endpoints = [];
    private IChangeToken _changeToken;
    private CancellationTokenSource _cancellationTokenSource;
    public override IReadOnlyList<Microsoft.AspNetCore.Http.Endpoint> Endpoints => [.. endpoints.Values];
    public override IChangeToken GetChangeToken() => _changeToken;

    public CodeEndpointDataSource()
    {
        _cancellationTokenSource = new CancellationTokenSource();
        _changeToken = new CancellationChangeToken(_cancellationTokenSource.Token);
    }

    public void Reload()
    {
        var oldCancellationTokenSource = _cancellationTokenSource;
        _cancellationTokenSource = new CancellationTokenSource();
        _changeToken = new CancellationChangeToken(_cancellationTokenSource.Token);
        oldCancellationTokenSource?.Cancel();
    }

    public void AddEndpoint(string key, string pattern, RequestDelegate handle, int order = 0)
    {
        var routePattern = RoutePatternFactory.Parse(pattern);
        var endpoint = new RouteEndpointBuilder(handle, routePattern, order).Build();
        endpoints.TryAdd(key, endpoint);
        Reload();
    }

    public void RemoveEndpoint(string key)
    {
        endpoints.TryRemove(key, out _);
        Reload();
    }
}