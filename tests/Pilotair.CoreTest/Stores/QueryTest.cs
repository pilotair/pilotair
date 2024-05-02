using Pilotair.Core.Stores;

namespace Pilotair.CoreTest.Stores;

[TestClass]
public class QueryTest
{

    [TestInitialize]
    public async Task InitAsync()
    {
        var store = new Store("query_test.db");
        var collection = store.GetOrCreate<User>();
        var count = await collection.Query.CountAsync();
        if (count == 0)
        {
            await collection.AddDocumentAsync(new User
            {
                Name = "Alex",
                Age = 23,
                Tags = ["1", "2"]
            });

            await collection.AddDocumentAsync(new User
            {
                Name = "Jobs",
                Age = 24,
                Tags = ["1", "2"]
            });
        }
    }
    [TestMethod]
    public async Task TakeAsync()
    {
        var store = new Store("query_test.db");
        var collection = store.GetOrCreate<User>();
        var users = await collection.Query.Where("$.name", "Alex").TakeAsync();
        Assert.AreEqual(users.Length, 1);
    }
}