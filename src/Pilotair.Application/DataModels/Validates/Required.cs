namespace Pilotair.Application.DataModels.Validates;

public class Required : IValidate
{
    public string Name => "required";

    public string Message => "The field is required";
}