using Pilotair.Core.Stores;

namespace Pilotair.CoreTest.Stores;

public class TestStore : Store
{
    public TestStore() : base("test.db")
    {
        User = new Collection<User>(connectionString);
    }

    public Collection<User> User { get; init; }
}

public class User
{
    public string? Name { get; set; }
    public int Age { get; set; }
    public string[]? Tags { get; set; }
}