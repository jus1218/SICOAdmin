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
    
    public partial class SP_C_VerEstadoCuenta_Result
    {
        public System.DateTime FechaDocumento { get; set; }
        public int CondicionPago { get; set; }
        public decimal Monto { get; set; }
        public Nullable<decimal> Pago { get; set; }
        public decimal Saldo { get; set; }
        public string TipoDocumento { get; set; }
        public string Notas { get; set; }
        public Nullable<System.DateTime> FechaPago { get; set; }
        public string NombreCLiente { get; set; }
        public string Filial { get; set; }
    }
}