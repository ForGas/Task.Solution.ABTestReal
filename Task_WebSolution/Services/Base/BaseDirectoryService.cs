using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Task_WebSolution.Services.Interfaces;

namespace Task_WebSolution.Services.Base
{
    public abstract class BaseDirectoryService<TFileExtension> : IFileService<TFileExtension>
        where TFileExtension : Enum
    {
        private readonly string _directoryPath;
        private readonly string _filesDirectoryName;

        protected BaseDirectoryService(string directory, string filesDirectoryName)
        {
            _directoryPath = directory;
            _filesDirectoryName = filesDirectoryName;
        }

        public string GetDirectoryPath()
        {
            return _directoryPath;
        }

        public string? GetFilePath(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
            {
                return null;
            }

            if (_filesDirectoryName == new DirectoryInfo(_directoryPath).Name)
            {
                return string.Concat(_directoryPath, '\\', fileName);
            }

            var filesPath = Path.Combine(_filesDirectoryName, fileName);

            return Path.GetFullPath(filesPath, _directoryPath);
        }

        public List<string>? FindFilesNameByExtension(string approximateFileName)
        {
            if (string.IsNullOrEmpty(approximateFileName))
            {
                return null;
            }

            var filesNames = Directory
                    .GetFiles(Path.Combine(_directoryPath, _filesDirectoryName))
                        .Select(x => Path.GetFileName(x))
                            .ToList();

            var extension = GetExtensionByFileName(approximateFileName);

            var result = filesNames
                    .Where(x => extension == GetExtensionByFileName(x))
                        .ToList();

            return result;
        }

        public string GetExtensionByFileName(string fileName)
        {
            return Path.GetExtension(fileName);
        }

        public bool IsFileExists(string fileName)
        {
            var path = GetFilePath(fileName);

            return File.Exists(path);
        }

        public bool VerifyFileNameExtension(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
            {
                return false;
            }

            var regex = new Regex(@"^\w*.");
            var fileExtension = regex.Replace(fileName, "");

            var extensions = Enum.GetNames(typeof(TFileExtension));

            return extensions.Any(item => item.ToLower() == fileExtension);
        }

        public async Task<string?> ReadLogsInFileAsync(string fileName)
        {
            var path = GetFilePath(fileName);

            if (path == null)
            {
                return null;
            }

            using var streamReader = new StreamReader(
                    new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite), false);

            var result = await streamReader.ReadToEndAsync();

            return result;
        }

        public string? GetLastLogFileName(IEnumerable<string> fileNames, string fileName)
        {
            if (fileNames is null || fileNames.Count() < 1 || string.IsNullOrEmpty(fileName))
            {
                return null;
            }

            if (fileNames.Count() == 1)
            {
                return fileNames.FirstOrDefault();
            }

            var fileWithStartName = Path.GetFileNameWithoutExtension(fileName);

            Console.WriteLine($"fileWithStartName {fileWithStartName}");

            var fileNamesWithoutExtension = fileNames
                    .Select(x => Path.GetFileNameWithoutExtension(x))
                        .ToList();

            Console.WriteLine($"fileNamesWithoutExtension {fileNamesWithoutExtension}");

            var logNumbers = fileNamesWithoutExtension
                    .Select(x => x.Replace(fileWithStartName, ""))
                        .ToList();

            Console.WriteLine($"logNumbers {logNumbers}");

            var result = string.Concat(fileWithStartName,
                logNumbers
                    .Select(x => int.Parse(x))
                        .Aggregate((x, y) => x < y ? y : x),
                            GetExtensionByFileName(fileName));

            return result;
        }
    }
}
