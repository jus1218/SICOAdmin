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
    
    public partial class AUXILIAR_CXP
    {
        public string DocumentoCredito { get; set; }
        public string TipoDocumentoCredito { get; set; }
        public string DocumentoDebito { get; set; }
        public string TipoDocumentoDebito { get; set; }
        public int IdProveedor { get; set; }
        public int IdPartida { get; set; }
        public decimal Monto { get; set; }
        public string UsuarioCreacion { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        public virtual PARTIDA PARTIDA { get; set; }
        public virtual DOCUMENTO_CXP DOCUMENTO_CXP { get; set; }
        public virtual DOCUMENTO_CXP DOCUMENTO_CXP1 { get; set; }
    }
}