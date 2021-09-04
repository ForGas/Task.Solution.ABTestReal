namespace Task_WebSolution.Services.Interfaces
{
    public interface ICheckFile
    {
        bool VerifyFileNameExtension(string fileName);
        bool IsFileExists(string fileName);
    }
}
