using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


using SICOAdmin1._0.Models;

using System.Data.Entity.Core.Objects;
using SICOAdmin1._0.Models.User;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using SICOAdmin1._0.Models.Documento_Deposito;

using SICOAdmin1._0.Filters;

namespace SICOAdmin1._0.Controllers
{
    public class DocumentsController : Controller
    {

        //============================================================
        //======================= LISTAS =============================
        //============================================================
        List<SP_C_Mostrar_Documentos_CXP_Result> lstDocumentos_CXP = new List<SP_C_Mostrar_Documentos_CXP_Result>();

        List<SP_C_Mostrar_Documentos_CXC_Result> lstDocumentos_CXC = new List<SP_C_Mostrar_Documentos_CXC_Result>();


        List<SP_C_Mostrar_Proveedores_Activos_Result> lstProviders = new List<SP_C_Mostrar_Proveedores_Activos_Result>();

        List<SP_C_Mostrar_Clientes_Activos_Result> lstClients = new List<SP_C_Mostrar_Clientes_Activos_Result>();

        List<SelectListItem> selectProviders = new List<SelectListItem>();
        List<SelectListItem> selectClients = new List<SelectListItem>();



        //============================================================
        //======================= VARIABLES ==========================
        //============================================================

        int PagActual = 0;
        const int DEFAULT_NUMBER_PAGE = 1;

        ObjectParameter totalPag = new ObjectParameter("TotalPag", 0);
        ObjectParameter msj = new ObjectParameter("msj", " ");
        ObjectParameter res = new ObjectParameter("res", 0);


        //[AuthorizeUser(pAccion: 67)]
        public ActionResult Index()
        {
            try
            {
                using (var DB = new SICOAdminEntities())
                {
                    lstDocumentos_CXP = DB.SP_C_Mostrar_Documentos_CXP(PagActual, DEFAULT_NUMBER_PAGE, "", totalPag).ToList();

                    lstDocumentos_CXC = DB.SP_C_Mostrar_Documentos_CXC(PagActual, DEFAULT_NUMBER_PAGE, "", totalPag).ToList();
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            ViewBag.lstClients = getListActiveClients();

            ViewBag.lstProviders = getListActiveProviders();

            ViewBag.lstDocuments_CXC = lstDocumentos_CXC;

            ViewBag.PagActual = PagActual + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn

            return View(lstDocumentos_CXP);
        }

        //=================== METODOS FETCH ======================
        //=============== DOCUMENTOS CXP ======================
        [AuthorizeUser(pAccion: 70)]
        public JsonResult AddDocument_CXP(DOCUMENTO_CXP obj)
        {
            try
            {
                if (obj.Notas == null)
                {
                    obj.Notas = "N/A";
                }
                using (var db = new SICOAdminEntities())
                {
                    db.SP_P_CrearDocumento("DOCUMENTO_CXP",
                        obj.Documento,
                        obj.IdProveedor,
                        obj.TipoDocumento,
                        obj.Monto,
                        obj.CondicionPago,
                        obj.FechaDocumento,
                        obj.Notas,
                        ((User)Session["User"]).userName, res, msj);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return Json(
                new
                {
                    resp = res.Value,
                    msj = msj.Value
                }, JsonRequestBehavior.AllowGet);
        }

        [AuthorizeUser(pAccion: 72)]
        public JsonResult EditDocument_CXP(DOCUMENTO_CXP obj)
        {
            if (obj.Notas == null)
            {
                obj.Notas = "N/A";
            }
            using (var db = new SICOAdminEntities())
            {
                db.SP_P_ModificarDocumento("DOCUMENTO_CXP", obj.Documento, obj.IdProveedor, obj.TipoDocumento, obj.Monto, obj.CondicionPago, obj.FechaDocumento, obj.Notas,
                    ((User)Session["User"]).userName, res, msj);
            }
            return Json(
              new
              {
                  resp = res.Value,
                  msj = msj.Value
              }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getDataDocument_CXP(string pDoc)
        {

            SP_C__Buscar_Documento_CXP_Result document = new SP_C__Buscar_Documento_CXP_Result();
            
            using (var db = new SICOAdminEntities())
                document = db.SP_C__Buscar_Documento_CXP(pDoc).First();

            var obj = new
            {
                Documento = document.Documento,
                IdProveedor = document.IdProveedor,
                NombreCliente = document.Nombre,
                Identificacion = document.Identificacion,
                TipoDocumento = document.TipoDocumento,
                Monto = document.Monto,
                Saldo = document.Saldo,
                Estado = document.Estado,
                CondicionPago = document.CondicionPago,
                FechaDocumento = document.FechaDocumento.ToString("yyyy-MM-dd"),
                Nota = document.Notas,


                UserCreation = document.UsuarioCreacion,
                CreationDate = document.FechaCreacion.ToString("dd/MM/yyyy"),

                ModificationDate = document.FechaModificacion.ToString("dd/MM/yyyy"),
                UserModification = document.UsuarioModificacion


            };

            return Json(obj, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getDocumentosxProveedor(int pIdProveedor)
        {

            List<SP_C_Buscar_DocumentosCXP_Por_Proveedor_Result> lstDocumentosDisponiles = new List<SP_C_Buscar_DocumentosCXP_Por_Proveedor_Result>();
            try
            {
                using (var db = new SICOAdminEntities())
                {
                    lstDocumentosDisponiles = db.SP_C_Buscar_DocumentosCXP_Por_Proveedor(pIdProveedor).ToList();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return Json(
                new
                {
                    lstDocumentosDisponiles
                }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult getProviders()
        {
            try
            {
                selectProviders = getListActiveProviders();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return Json(
                new
                {
                    selectProviders
                }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getDeposits_CXP(string pDocument)
        {

            List<SP_C_Mostrar_Facturtas_CXP_Result> depositos = new List<SP_C_Mostrar_Facturtas_CXP_Result>();

            using (var db = new SICOAdminEntities())
                depositos = db.SP_C_Mostrar_Facturtas_CXP(pDocument).ToList();

            return Json(depositos, JsonRequestBehavior.AllowGet);

        }
        //=============== DOCUMENTOS CXC ======================
        [AuthorizeUser(pAccion: 66)]
        public JsonResult AddDocument_CXC(DOCUMENTO_CXC obj)
        {
            try
            {
                if (obj.Notas == null)
                {
                    obj.Notas = "N/A";
                }

                using (var db = new SICOAdminEntities())
                {
                    db.SP_P_CrearDocumento("DOCUMENTO_CXC",
                        obj.Documento,
                        obj.IdCliente,
                        obj.TipoDocumento,
                        obj.Monto,


                        obj.CondicionPago,
                        obj.FechaDocumento,
                        obj.Notas,
                        ((User)Session["User"]).userName, res, msj);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return Json(
                new
                {
                    resp = res.Value,
                    msj = msj.Value
                }, JsonRequestBehavior.AllowGet);
        }

        [AuthorizeUser(pAccion: 68)]
        public JsonResult EditDocument_CXC(DOCUMENTO_CXC obj)
        {
            try
            {
                if (obj.Notas == null)
                {
                    obj.Notas = "N/A";
                }
                using (var db = new SICOAdminEntities())
                {
                    db.SP_P_ModificarDocumento("DOCUMENTO_CXC", obj.Documento, obj.IdCliente, obj.TipoDocumento, obj.Monto, obj.CondicionPago, obj.FechaDocumento, obj.Notas,

                        ((User)Session["User"]).userName, res, msj);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return Json(
                new
                {
                    resp = res.Value,
                    msj = msj.Value
                }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getParameter() {


            SP_C_BuscarParametroActivo_Result parametro = new SP_C_BuscarParametroActivo_Result();

                using (var db = new SICOAdminEntities())
                parametro = db.SP_C_BuscarParametroActivo().First();

                return Json(parametro, JsonRequestBehavior.AllowGet);

            
        }

        public JsonResult getDataDocument_CXC(string pDoc)
        {


            SP_C__Buscar_Documento_CXC_Result document_cxc = new SP_C__Buscar_Documento_CXC_Result();

            using (var db = new SICOAdminEntities())
                document_cxc = db.SP_C__Buscar_Documento_CXC(pDoc).First();

            var obj = new
            {
                Documento = document_cxc.Documento,
                IdCliente = document_cxc.IdCliente,
                NombreCliente = document_cxc.Nombre,
                Identificacion = document_cxc.Identificacion,
                TipoDocumento = document_cxc.TipoDocumento,
                Monto = document_cxc.Monto,
                Saldo = document_cxc.Saldo,
                Estado = document_cxc.Estado,
                CondicionPago = document_cxc.CondicionPago,
                FechaDocumento = document_cxc.FechaDocumento.ToString("yyyy-MM-dd"),
                Nota = document_cxc.Notas,


                UserCreation = document_cxc.UsuarioCreacion,
                CreationDate = document_cxc.FechaCreacion.ToString("dd/MM/yyyy"),

                ModificationDate = document_cxc.FechaModificacion.ToString("dd/MM/yyyy"),
                UserModification = document_cxc.UsuarioModificacion


            };

            return Json(obj, JsonRequestBehavior.AllowGet);

        }


        public JsonResult getDeposits_CXC(string pDocument)
        {

            List<SP_C_Mostrar_Depositos_CXC_Result> depositos = new List<SP_C_Mostrar_Depositos_CXC_Result>();

            using (var db = new SICOAdminEntities())
                depositos = db.SP_C_Mostrar_Depositos_CXC(pDocument).ToList();

            return Json(depositos, JsonRequestBehavior.AllowGet);

        }

        public JsonResult getClients()
        {
            try
            {
                selectClients = getListActiveClients();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return Json(
                new
                {
                    selectClients
                }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getDocumentosxCliente(int pIdCliente)
        {

            List<SP_C_Buscar_DocumentosCXC_Por_Cliente_Result> lstDocumentosDisponiles = new List<SP_C_Buscar_DocumentosCXC_Por_Cliente_Result>();
            try
            {
                using (var db = new SICOAdminEntities())
                {
                    lstDocumentosDisponiles = db.SP_C_Buscar_DocumentosCXC_Por_Cliente(pIdCliente).ToList();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return Json(
                new
                {
                    lstDocumentosDisponiles
                }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult AddMixedDocuments(DocumentosCXC obj)
        {
            try
            {
                var db = new SICOAdminEntities();

                if (obj.NuevoDocumento)
                {
                    using (db)
                    {
                        db.SP_P_CrearDocumento(obj.NombreTabla, obj.DocumentoDebito, obj.IdCliente, obj.TipoDocumento,
                        obj.MontoDebito, obj.CondicionPago, obj.FechaDocumentoDebito, obj.NotaDebito, ((User)Session["User"]).userName, res, msj);

                        if (obj.DocumentoCredito != null && Convert.ToInt32(res.Value) == 1)
                        {
                            db.SP_P_CrearAuxiliar(obj.NombreTablaAuxiliar, obj.DocumentoCredito, obj.DocumentoDebito, obj.IdPartida, ((User)Session["User"]).userName, res, msj);
                        }
                    }
                }
                else
                {
                    db.SP_P_CrearAuxiliar(obj.NombreTablaAuxiliar, obj.DocumentoCredito, obj.DocumentoDebito, obj.IdPartida, ((User)Session["User"]).userName, res, msj);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return Json(
                   new
                   {
                       resp = res.Value,
                       msj = msj.Value
                   }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GenerateDeposit(DocumentosCXC obj)
        {
            try
            {
                var db = new SICOAdminEntities();
                using (db)
                {
                    db.SP_P_CrearAuxiliar(obj.NombreTablaAuxiliar, obj.DocumentoCredito, obj.DocumentoDebito, obj.IdPartida, ((User)Session["User"]).userName, res, msj);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return Json(
                   new
                   {
                       resp = res.Value,
                       msj = msj.Value
                   }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult removeDeposit(DocumentosCXC obj)
        {
            //ObjectParameter mensaje = new ObjectParameter("mensaje", ""); 
            //ObjectParameter resp = new ObjectParameter("resp", 0);

            try

            {
                var db = new SICOAdminEntities();
                using (db)
                {
                    db.SP_P_EliminarRelacionAuxiliarDocumento(obj.NombreTablaAuxiliar, obj.DocumentoCredito, obj.DocumentoDebito, res, msj);

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return Json(
                new
                {
                    resp = res.Value,
                    msj = msj.Value
                }, JsonRequestBehavior.AllowGet);
        }

        //========================== PARTIAL_VIEW ================================


        //========== METODOS DE CUENTAS X COBRAR ================

        public PartialViewResult _ShowDocuments_CXC(Pagina obj)
        {
            //Si no busca viene nulo
            if (obj.palabraBuscar == null) obj.palabraBuscar = "";

            // Validacion si el usuario esta buscado o solo pasando de pagina
            if (obj.accion.Equals('S')) obj.NumPagina += 1; //Enviar al SP
            else if (obj.accion.Equals('N')) obj.NumPagina -= 1;

            // Restricciones para que no busque paginas que no existe
            if (obj.NumPagina > obj.totalPaginas - 1) obj.NumPagina = Convert.ToInt32(totalPag.Value);
            else if (obj.NumPagina < 0) obj.NumPagina = 0;


            using (var DB = new SICOAdminEntities())
            {
                lstDocumentos_CXC = DB.SP_C_Mostrar_Documentos_CXC(obj.NumPagina, obj.CantRegistros, obj.palabraBuscar, totalPag).ToList();
            }


            //Datos a la vista
            ViewBag.PagActual = obj.NumPagina + 1;
            ViewBag.totalPag = totalPag;


            ViewBag.lstClients = getListActiveClients();
            ViewBag.lstProviders = getListActiveProviders();
            ViewBag.lstDocuments_CXC = lstDocumentos_CXC;

            return PartialView("_ShowDocuments_CXC", lstDocumentos_CXC);
        }
        public PartialViewResult _TableDocument_CXC(Pagina obj)
        {
            //Si no busca viene nulo
            if (obj.palabraBuscar == null) obj.palabraBuscar = "";

            // Validacion si el usuario esta buscado o solo pasando de pagina
            if (obj.accion.Equals('S')) obj.NumPagina += 1; //Enviar al SP
            else if (obj.accion.Equals('N')) obj.NumPagina -= 1;

            // Restricciones para que no busque paginas que no existe
            if (obj.NumPagina > obj.totalPaginas - 1) obj.NumPagina = Convert.ToInt32(totalPag.Value);
            else if (obj.NumPagina < 0) obj.NumPagina = 0;


            using (var DB = new SICOAdminEntities())
                lstDocumentos_CXC = DB.SP_C_Mostrar_Documentos_CXC(obj.NumPagina, obj.CantRegistros, obj.palabraBuscar, totalPag).ToList();


            //Datos a la vista
            ViewBag.PagActual = obj.NumPagina + 1;
            ViewBag.totalPag = totalPag;


            return PartialView("_TableDocument_CXC", lstDocumentos_CXC);
        }


        //========== METODOS DE CUENTAS X PAGAR ================
        public PartialViewResult _TableDocument_CXP(Pagina obj)
        {
            //Si no busca viene nulo
            if (obj.palabraBuscar == null) obj.palabraBuscar = "";

            // Validacion si el usuario esta buscado o solo pasando de pagina
            if (obj.accion.Equals('S')) obj.NumPagina += 1; //Enviar al SP
            else if (obj.accion.Equals('N')) obj.NumPagina -= 1;

            // Restricciones para que no busque paginas que no existe
            if (obj.NumPagina > obj.totalPaginas - 1) obj.NumPagina = Convert.ToInt32(totalPag.Value);
            else if (obj.NumPagina < 0) obj.NumPagina = 0;

            //var nombreTabla = "DOCUMENTO_CXP";
            using (var DB = new SICOAdminEntities())
                lstDocumentos_CXP = DB.SP_C_Mostrar_Documentos_CXP(obj.NumPagina, obj.CantRegistros, obj.palabraBuscar, totalPag).ToList();


            //Datos a la vista
            ViewBag.PagActual = obj.NumPagina + 1;
            ViewBag.totalPag = totalPag;


            return PartialView("_TableDocument_CXP", lstDocumentos_CXP);
        }


        public PartialViewResult _ShowDocuments_CXP(Pagina obj)
        {
            //Si no busca viene nulo
            if (obj.palabraBuscar == null) obj.palabraBuscar = "";

            // Validacion si el usuario esta buscado o solo pasando de pagina
            if (obj.accion.Equals('S')) obj.NumPagina += 1; //Enviar al SP
            else if (obj.accion.Equals('N')) obj.NumPagina -= 1;

            // Restricciones para que no busque paginas que no existe
            if (obj.NumPagina > obj.totalPaginas - 1) obj.NumPagina = Convert.ToInt32(totalPag.Value);
            else if (obj.NumPagina < 0) obj.NumPagina = 0;


            using (var DB = new SICOAdminEntities())
            {
                lstDocumentos_CXP = DB.SP_C_Mostrar_Documentos_CXP(obj.NumPagina, obj.CantRegistros, obj.palabraBuscar, totalPag).ToList();
            }


            //Datos a la vista
            ViewBag.PagActual = obj.NumPagina + 1;
            ViewBag.totalPag = totalPag;


            ViewBag.lstClients = getListActiveClients();
            ViewBag.lstProviders = getListActiveProviders();
            ViewBag.lstDocuments_CXC = lstDocumentos_CXC;

            return PartialView("_ShowDocuments_CXP", lstDocumentos_CXP);
        }

        public PartialViewResult _AddDocument_CXP()
        {
            using (var DB = new SICOAdminEntities())
                lstProviders = DB.SP_C_Mostrar_Proveedores_Activos().ToList();

            //selectProviders = lstProviders.ConvertAll(d =>
            //{
            //    return new SelectListItem()
            //    {
            //        Text = "#" + d.IdProveedor.ToString() + " - " + d.Nombre,
            //        Value = d.Identificacion,
            //        Selected = false
            //    };

            //});
            //ViewBag.lstProviders = selectProviders;
            ViewBag.lstProviders = getListActiveProviders();
            return PartialView("_ShowDocuments");
            //  return PartialView("_FormDocument_CXP",selectProviders);

        }

        //FUNCIONES 


        //public List<SP_C_Buscar_Documentos_CXC_Result> listClean_CXC(List<SP_C_Buscar_Documentos_CXC_Result> lst_cxc)
        //{

        //    List<SP_C_Buscar_Documentos_CXC_Result> lstDocs_Clean = new List<SP_C_Buscar_Documentos_CXC_Result>();


        //    lstDocs_Clean = lst_cxc.ConvertAll(document =>
        //    {
        //        return new SP_C_Buscar_Documentos_CXC_Result()
        //        {
        //           document.Documento,
        //        };

        //    });

        //    return lstDocs_Clean;

        //}
        public List<SelectListItem> getListActiveProviders()
        {

            using (var DB = new SICOAdminEntities())
                lstProviders = DB.SP_C_Mostrar_Proveedores_Activos().ToList();

            selectProviders = lstProviders.ConvertAll(d =>
                {
                    return new SelectListItem()
                    {
                        Text = "#" + d.Identificacion.ToString() + " - " + d.Nombre,
                        Value = Convert.ToString(d.IdProveedor),
                        Selected = false
                    };

                });

            if (selectProviders != null)
            {

                ViewBag.lstProviders = selectProviders;
                return selectProviders;
            }
            else
            {
                return null;
            }
        }

        public List<SelectListItem> getListActiveClients()
        {

            using (var DB = new SICOAdminEntities())
                lstClients = DB.SP_C_Mostrar_Clientes_Activos().ToList();

            selectClients = lstClients.ConvertAll(d =>
            {
                return new SelectListItem()
                {
                    Text = "#" + d.Identificacion.ToString() + " - " + d.Nombre,
                    Value = Convert.ToString(d.IdCliente),
                    Selected = false
                };

            });

            if (selectClients != null)
            {

                ViewBag.ltsClients = selectClients;
                return selectClients;
            }
            else
            {
                return null;
            }
        }

    }
}
