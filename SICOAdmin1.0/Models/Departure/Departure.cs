using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SICOAdmin1._0.Models.Departure
{
	public class Departure
	{
        public int IdPartida { set; get; }
        public string Description { set; get; }
        public string Alias { set; get; }
        public string TypeDep { set; get; }
        public bool Active { set; get; }
        public String UserCreation { set; get; }
        public String UserModification { set; get; }
        public DateTime DateCreation { set; get; }
        public DateTime DateModification { set; get; }

    }
}
