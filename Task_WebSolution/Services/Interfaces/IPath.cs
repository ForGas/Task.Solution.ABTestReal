namespace Task_WebSolution.Services.Interfaces
{
    public interface IPath
    {
        public string? GetFilePath(string fileName);
        public string GetDirectoryPath();
    }
}
