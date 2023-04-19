using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SICOAdmin1._0.Models.Documento_Deposito
{
    public class DocumentoDeposito
    {
       public string NombreTabla { get; set; }
        public string NombreTablaAuxiliar { get; set; }
        public string DocumentoDebito { get; set; }
        public string DocumentoCredito { get; set; }
        public System.DateTime FechaDocumento { get; set; }
        public int CondicionPago { get; set; }
        public string Nota { get; set; }
        public int IdPartida { get; set; }

        public decimal Monto { get; set; }


    }
}