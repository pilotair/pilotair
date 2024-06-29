namespace system;

public static class ObjectExtensions
{
    public static void Fill(this object self, object value)
    {
        foreach (var property in value.GetType().GetProperties())
        {
            if (property.CanWrite)
            {
                property.SetValue(self, property.GetValue(value));
            }
        }
    }
}