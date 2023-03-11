using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SICOAdmin1._0.Models.ActionType
{
    public class TypeActionPers
    {
        public int IdTypeActionPers { get; set; }
        public string Description { get; set; }
        public string TypeAction { get; set; }
        public string StatusEmployed { get; set; }
        public bool ResetState { get; set; }
        public string UserCreation { get; set; }
        public string UserModification { get; set; }

        public DateTime CreationDate { get; set; }
        public DateTime ModificationDate { get; set; }
    }
}