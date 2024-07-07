namespace System;

public static class ObjectExtensions
{
    public static void From<T, TBase>(this T self, TBase value) where T : TBase
    {
        if(value is null) throw new ArgumentNullException(nameof(value));
        
        foreach (var property in value.GetType().GetProperties())
        {
            if (property.CanWrite)
            {
                property.SetValue(self, property.GetValue(value));
            }
        }
    }
}