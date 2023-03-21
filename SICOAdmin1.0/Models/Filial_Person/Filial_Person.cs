using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace SICOAdmin1._0.Models.Filial_Persona
{
    public class Filial_Person
    {
        public int IdFilial { get; set; }
        public int IdPerson { get; set; }
        public string Name { get; set; }
        public string Identification { get; set; }
        public bool Active { get; set; }
        public bool Responsable { get; set; }
        public string Type { get; set; }
        public string Treatment { get; set; }
        public string Email { get; set; }
        public string Telephone1 { get; set; }
        public string Telephone2 { get; set; }
        public string WhatsApp { get; set; }
        public string UserCreation { get; set; }
        public DateTime DateCreation { get; set; }
        public string UserModification { get; set; }
        public DateTime DateModification { get; set; }
    }
}