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

public class ExistException<T> : PilotairException
{
    public ExistException(string name) : base($"'{typeof(T).Name}' name exist")
    {

    }
}

public class NotFoundException<T> : PilotairException
{
    public NotFoundException(string name) : base($"'{typeof(T).Name}' {name} not found")
    {

    }
}