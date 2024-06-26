using Pilotair.Core.Helpers;

namespace Pilotair.CoreTest.Helpers;

[TestClass]
public class CryptographyHelperTest
{
    [TestMethod]
    public void StringHashMd5()
    {
        var sample = TestResource.GetPath("sample.txt");
        var stream = new FileStream(sample, FileMode.Open);
        var fromStream = CryptographyHelper.HashMd5(stream);
        var fromString = CryptographyHelper.HashMd5("Hello 你好!");
        Assert.AreEqual(fromStream, fromString);
    }

    [TestMethod]
    public void HashMd5WithLabel()
    {
        Assert.IsTrue(CryptographyHelper.HashMd5("Hello 你好!", 0x1000).StartsWith("1000"));
        Assert.IsTrue(CryptographyHelper.HashMd5("Hello 你好!", 0x1001).StartsWith("1001"));
        Assert.IsTrue(CryptographyHelper.HashMd5("Hello 你好!", 0xff01).StartsWith("ff01"));
    }
}