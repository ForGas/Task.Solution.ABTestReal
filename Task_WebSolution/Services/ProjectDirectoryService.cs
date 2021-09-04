using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Task_WebSolution.Services.Base;

namespace Task_WebSolution.Services
{
    public class ProjectDirectoryService : BaseDirectoryService<TextFormat>
    {
        public ProjectDirectoryService()
            : base(Path.GetFullPath(
                    Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\..")),
                 new DirectoryInfo(Path.GetFullPath(
                    Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\.."))).Name)
        {

        }

        public ProjectDirectoryService(string filesDirectoryName)
            : base(Path.GetFullPath(
                    Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\..")),
                  filesDirectoryName)
        {

        }

        public ProjectDirectoryService(Assembly assembly, string filesDirectoryName)
            : base(Path.GetFullPath(
                    Path.Combine(Path.GetDirectoryName(assembly.Location), @"..\..\..")),
                  filesDirectoryName)
        {

        }
    }
}
