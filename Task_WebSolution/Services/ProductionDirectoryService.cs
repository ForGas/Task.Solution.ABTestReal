using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Task_WebSolution.Services.Base;

namespace Task_WebSolution.Services
{
    public class ProductionDirectoryService : BaseDirectoryService<TextFormat>
    {
        public ProductionDirectoryService(string filesDirectoryName)
            : base(Path.GetFullPath(AppDomain.CurrentDomain.BaseDirectory), filesDirectoryName)
        {

        }
    }
}
