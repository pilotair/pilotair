namespace Pilotair.Core.Acme;

public interface IMessage<TResponse>
{
    string Path { get; }

    bool IsGet { get; }
}