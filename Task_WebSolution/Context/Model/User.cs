using System;
using Task_WebSolution.Context.Model.Base;

namespace Task_WebSolution.Context.Model
{
    public class User : BaseModel
    {
        public DateTime? DateRegistration { get; set; }
        public DateTime? DateLastActivity { get; set; }
    }

}
