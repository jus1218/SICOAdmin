using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SICOAdmin1._0.Models
{
    public class TipoProveedor
    {

        public int IdProveedor { get; set; }
        public string Nombre { get; set; }
        public string Identificacion { get; set; }
        public string Tipo { get; set; }
        public string Contacto { get; set; }
        public string Telefono1 { get; set; }
        public string Telefono2 { get; set; }
        public string CorreoElectronico { get; set; }
        public int CondicionPago { get; set; }
        public string CuentaBancaria { get; set; }
        public string Banco { get; set; }
        public Nullable<bool> Activo { get; set; }
        public string UsuarioCreacion { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public string UsuarioModificacion { get; set; }
        public System.DateTime FechaModificacion { get; set; }
    }
}