using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Task_WebSolution.Services.Interfaces
{
    public interface IFileService<TFileExtension> : IPath, ICheckFile
         where TFileExtension : Enum
    {
        public List<string>? FindFilesNameByExtension(string approximateFileName);
        public string GetExtensionByFileName(string fileName);
        public Task<string?> ReadLogsInFileAsync(string fileName);
        public string? GetLastLogFileName(IEnumerable<string> fileNames, string fileName);
    }
}