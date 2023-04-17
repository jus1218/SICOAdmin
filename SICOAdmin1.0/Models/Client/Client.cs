using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SICOAdmin1._0.Models.Client
{
    public class Client
    {
        public int IdClient { get; set; }
        public int IdFilial { get; set; }
        public string Name { get; set; }
        public string Identification { get; set; }
        public string Type { get; set; }
        public string Contact { get; set; }
        public string Telephone1 { get; set; }
        public string Telephone2 { get; set; }
        public string Email { get; set; }
        public int ConditionPay { get; set; }
        public bool Active { get; set; }
        public string UserCreation { get; set; }
        public DateTime DateCreation { get; set; }
        public string UserModification { get; set; }
        public DateTime DateModification { get; set; }
    }
}