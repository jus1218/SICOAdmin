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
    
    public partial class SP_C_BuscarControlAsistencia_Result
    {
        public int IdAsistencia { get; set; }
        public int IdColaborador { get; set; }
        public System.DateTime FechaHoraIngreso { get; set; }
        public System.DateTime FechaHoraSalida { get; set; }
        public string TipoJornada { get; set; }
        public decimal HorasRegulares { get; set; }
        public decimal HorasExtras { get; set; }
        public decimal HoraDobles { get; set; }
        public decimal HorasExtrasDobles { get; set; }
        public string UsuarioCreacion { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public System.DateTime FechaModificacion { get; set; }
        public string nomColaborador { get; set; }
    }
}
