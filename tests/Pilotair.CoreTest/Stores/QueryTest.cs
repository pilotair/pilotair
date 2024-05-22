using Pilotair.Core.Stores.NoSqlite;

namespace Pilotair.CoreTest.Stores;

[TestClass]
public class QueryTest
{

    [TestInitialize]
    public async Task InitAsync()
    {
        var store = new NoSqliteStore("query_test.db");
        var userCollection = store.GetOrCreate<User>();
        var postCollection = store.GetOrCreate<Post>();
        var userCount = await userCollection.Query.CountAsync();
        if (userCount == 0)
        {
            var user1 = await userCollection.AddDocumentAsync(new User
            {
                Name = "Alex",
                Age = 23,
                Tags = ["1", "2"]
            });

            await userCollection.AddDocumentAsync(new User
            {
                Name = "Jobs",
                Age = 24,
                Tags = ["1", "2"]
            });

            await postCollection.AddDocumentAsync(new Post
            {
                Title = "hello"
            }, user1.Id);

            await postCollection.AddDocumentAsync(new Post
            {
                Title = "world"
            });
        }
    }

    [TestMethod]
    public async Task TakeAsync()
    {
        var store = new NoSqliteStore("query_test.db");
        var collection = store.GetOrCreate<User>();
        var users = await collection.Query.Where("$.name", "Alex").TakeAsync();
        Assert.AreEqual(users.Length, 1);
    }

    [TestMethod]
    public async Task ExcludeAsync()
    {
        var store = new NoSqliteStore("query_test.db");
        var collection = store.GetOrCreate<User>();
        var user = await collection.Query.Where("$.name", "Alex").Exclude("$.tags").FirstOrDefaultAsync();
        Assert.IsNull(user!.Data.Tags);
    }

    [TestMethod]
    public async Task ParentInAsync()
    {
        var store = new NoSqliteStore("query_test.db");
        var collection = store.GetOrCreate<User>();
        var user = await collection.Query.FirstOrDefaultAsync();
        var posts = await store.GetOrCreate<Post>().Query.ParentIn(user.Id).TakeAsync();
        Assert.AreEqual(posts.Length, 1);
    }
}