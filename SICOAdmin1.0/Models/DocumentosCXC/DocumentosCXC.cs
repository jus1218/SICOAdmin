using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SICOAdmin1._0.Models.Documento_Deposito
{
    public class DocumentosCXC
    {
        public bool NuevoDocumento { get; set; }
        public string NombreTabla { get; set; } = "DOCUMENTO_CXC";
        public string NombreTablaAuxiliar { get; set; } = "AUXILIAR_CXC";


        public string DocumentoDebito { get; set; } 
        public decimal MontoDebito { get; set; }
        public decimal SaldoDebito { get; set; }
        public string TipoDocumento { get; set; } 
        public System.DateTime FechaDocumentoDebito { get; set; }
        public int CondicionPago { get; set; }
        public string NotaDebito { get; set; }
        public int IdCliente { get; set; }

        public string DocumentoCredito { get; set; }
        public decimal MontoCrtedito { get; set; }
        public decimal SaldoCredito { get; set; }
        public System.DateTime FechaDocumentoAsociacion { get; set; }
        public int IdPartida { get; set; }


        


    }
}