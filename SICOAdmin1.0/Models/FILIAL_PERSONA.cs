//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SICOAdmin1._0.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class FILIAL_PERSONA
    {
        public byte IdFilial { get; set; }
        public int IdPersona { get; set; }
        public string Nombre { get; set; }
        public string Indentification { get; set; }
        public bool Activo { get; set; }
        public bool Responsable { get; set; }
        public string Tipo { get; set; }
        public string Trato { get; set; }
        public string CorreoElectronico { get; set; }
        public string Telefono1 { get; set; }
        public string Telefono2 { get; set; }
        public string WhatsApp { get; set; }
        public string UsuarioCreacion { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public System.DateTime FechaModificacion { get; set; }
    
        public virtual FILIAL FILIAL { get; set; }
    }
}
