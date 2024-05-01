using Pilotair.Core.Stores;

namespace Pilotair.CoreTest.Stores;

[TestClass]
public class CollectionTest
{
    [TestMethod]
    public async Task Document_CRUD_Async()
    {
        var store = new TestStore();
        var doc = new Document<User>
        {
            Data = new User
            {
                Name = "alex",
                Age = 23,
                Tags = ["a", "b"]
            }
        };

        await store.User.AddDocumentAsync(doc);
        var docOnDb = await store.User.GetAsync(doc.Id);
        Assert.AreEqual(doc.Id, docOnDb.Id);
        Assert.AreEqual(doc.CreationTime, docOnDb.CreationTime);
        Assert.AreEqual(doc.LastWriteTime, docOnDb.LastWriteTime);
        Assert.AreEqual(doc.Data.Name, docOnDb.Data.Name);
        Assert.AreEqual(doc.Data.Age, docOnDb.Data.Age);
        Assert.AreEqual(doc.Data.Tags[0], docOnDb.Data.Tags![0]);
        Assert.AreEqual(doc.Data.Tags[1], docOnDb.Data.Tags[1]);
        docOnDb.Data.Name = "jobs";
        await store.User.UpdateDocumentAsync(docOnDb);
        docOnDb = await store.User.GetAsync(doc.Id);
        Assert.AreEqual(docOnDb.Data.Name, "jobs");
        await store.User.RemoveDocumentAsync(doc.Id);
        await Assert.ThrowsExceptionAsync<DocumentNotFoundException>(async () =>
        {
            await store.User.GetAsync(doc.Id);
        });
    }
}