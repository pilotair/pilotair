namespace Pilotair.Core;

public class PilotairException : Exception
{
    public PilotairException()
    {
    }

    public PilotairException(string? message) : base(message)
    {
    }
}