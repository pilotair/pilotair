using Microsoft.AspNetCore.Routing.Patterns;
using Microsoft.Extensions.Primitives;

namespace Pilotair.Web.Endpoint;

public class EndpointDataSource : Microsoft.AspNetCore.Routing.EndpointDataSource
{
    private IReadOnlyList<Microsoft.AspNetCore.Http.Endpoint> endpoints = [];
    private IChangeToken _changeToken;
    private CancellationTokenSource _cancellationTokenSource;
    public EndpointDataSource()
    {
        _cancellationTokenSource = new CancellationTokenSource();
        _changeToken = new CancellationChangeToken(_cancellationTokenSource.Token);
        Task.Run(() =>
        {
            endpoints = new List<Microsoft.AspNetCore.Http.Endpoint> {
                new RouteEndpointBuilder((a)=>{
                    a.Response.WriteAsync("abc");
                    return Task.CompletedTask;
                },RoutePatternFactory.Parse("/abc"),0).Build()
            };

            var oldCancellationTokenSource = _cancellationTokenSource;
            _cancellationTokenSource = new CancellationTokenSource();
            _changeToken = new CancellationChangeToken(_cancellationTokenSource.Token);
            oldCancellationTokenSource?.Cancel();
        });
    }
    public override IReadOnlyList<Microsoft.AspNetCore.Http.Endpoint> Endpoints => endpoints;
    public override IChangeToken GetChangeToken() => _changeToken;
}