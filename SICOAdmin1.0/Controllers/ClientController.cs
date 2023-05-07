using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SICOAdmin1._0.Models;
using SICOAdmin1._0.Models.Client;
using SICOAdmin1._0.Models.User;
using System.Data.Entity.Core.Objects;

namespace SICOAdmin1._0.Controllers
{
    public class ClientController : Controller
    {
        //LISTAS
        List<SP_C_MostrarClientes_Result> lstClients = null;

        //VARIABLES
        ObjectParameter resultado = new ObjectParameter("resultado", 0);
        ObjectParameter mensaje = new ObjectParameter("mensaje", 0);

        //VARIABLES DE PAGINACION
        ObjectParameter totalPag = new ObjectParameter("totalPag", 0);
        int PagActual = 0;
        const int DEFAULT_NUMBER_PAGE = 1;

        // GET: Client
        public ActionResult Index()
        {
            List<SP_C_MostrarFiliales_Result> lstfilialesDB = null;

            try
            {
                using (var db = new SICOAdminEntities()) lstClients = db.SP_C_MostrarClientes(PagActual, DEFAULT_NUMBER_PAGE, "", totalPag).ToList();
                using (SICOAdminEntities db = new SICOAdminEntities())
                {
                    lstfilialesDB = db.SP_C_MostrarFiliales().OrderBy(e=>e.Descripcion).ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            List<SelectListItem> filials = lstfilialesDB.ConvertAll(
                 d =>
                 {
                     return new SelectListItem()
                     {
                         Value = d.IdFilial.ToString(),
                         Text = d.Descripcion,
                         Selected = false
                     };
                 });

            ViewBag.Filials = filials;

            ViewBag.PagActual = PagActual + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn

            return View(lstClients);
        }


        //===========================================JsResults Section================================================
        //Crear Cliente
        public JsonResult AddClient(Client objClient)
        {
            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                db.SP_P_CrearCliente((byte)objClient.IdFilial, objClient.Name, objClient.Identification, objClient.Type, objClient.Contact,
                    objClient.Telephone1, objClient.Telephone2, objClient.Email, objClient.ConditionPay, objClient.Active, ((User)Session["User"]).userName, DateTime.Now,
                    resultado, mensaje);
            }

            return Json(new
            {
                result = resultado.Value,
                message = mensaje.Value
            }, JsonRequestBehavior.AllowGet);
        }

        //Editar Cliente
        public JsonResult UpdateClient(Client objClient)
        {
            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                db.SP_P_ModificarCliente(objClient.Identification, objClient.Type, objClient.Contact,
                    objClient.Telephone1, objClient.Telephone2, objClient.Email, objClient.ConditionPay, objClient.Active, 
                    ((User)Session["User"]).userName, DateTime.Now, resultado, mensaje);
            }

            return Json(new
            {
                result = resultado.Value,
                message = mensaje.Value
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBitacora(string pIdentification)
        {
            SP_C_BuscarCliente_Result ClientDB = new SP_C_BuscarCliente_Result();
            Client objClient = new Client();

            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                ClientDB = db.SP_C_BuscarCliente(pIdentification, mensaje, resultado).FirstOrDefault();

                objClient.UserCreation = ClientDB.UsuarioCreacion;
                objClient.DateCreation = ClientDB.FechaCreacion;
                objClient.UserModification = ClientDB.UsuarioModificacion;
                objClient.DateModification = ClientDB.FechaModificacion;
            }

            var objC = new
            {
                objClient.UserCreation,
                DateCreation = objClient.DateCreation.ToString("dd/MM/yyyy H:mm:ss"),
                objClient.UserModification,
                DateModification = objClient.DateModification.ToString("dd/MM/yyyy H:mm:ss"),
            };


            return Json(objC, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActivClient(string pIdentification)
        {
            string message = "";
            bool result = false;

            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                db.SP_P_ActivarDesactivarCliente(pIdentification, ((User)Session["User"]).userName, DateTime.Now, resultado, mensaje);
                result = Convert.ToBoolean(resultado.Value);
            }
            if (result)
            {
                message = "1";
            }
            else
            {
                message = "2";
            }
            return Json(message, JsonRequestBehavior.AllowGet);
        }

        //Cargar datos de un cliente
        public JsonResult GetInfoClient(String pIdentification)
        {
            SP_C_BuscarCliente_Result clientDB = new SP_C_BuscarCliente_Result();
            Client modelC = null;

            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                clientDB = db.SP_C_BuscarCliente(pIdentification, mensaje, resultado).First();
            }

            modelC = new Client();

            modelC.IdFilial = clientDB.IdFilial;
            modelC.Name = clientDB.Nombre;
            modelC.Identification = clientDB.Identificacion;
            modelC.Type = clientDB.Tipo;
            modelC.Contact = clientDB.Contacto;
            modelC.Telephone1 = clientDB.Telefono1;
            modelC.Telephone2 = clientDB.Telefono2;
            modelC.Email = clientDB.CorreoElectronico;
            modelC.ConditionPay = clientDB.CondicionPago;
            modelC.Active = clientDB.Activo;

            var obj = new
            {
                modelC.IdFilial,
                modelC.Name,
                modelC.Identification,
                modelC.Type,
                modelC.Contact,
                modelC.Telephone1,
                modelC.Telephone2,
                modelC.Email,
                modelC.ConditionPay,
                modelC.Active
            };

            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        //VIISTA RENDER
        public PartialViewResult _GetClients()
        {

            try
            {

                using (var db = new SICOAdminEntities()) lstClients = db.SP_C_MostrarClientes(PagActual, DEFAULT_NUMBER_PAGE, "", totalPag).ToList();

            }
            catch (Exception e)
            {

                Console.WriteLine(e.Message);

            }


            ViewBag.PagActual = PagActual + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn


            return PartialView("_GetClients", lstClients);
        }

        public PartialViewResult _TableClient(Pagina obj)
        {
            //Si no busca viene nulo
            if (obj.palabraBuscar == null) obj.palabraBuscar = "";

            // Validacion si el usuario esta buscado o solo pasando de pagina
            if (obj.accion.Equals('S')) obj.NumPagina += 1; //Enviar al SP
            else if (obj.accion.Equals('N')) obj.NumPagina -= 1;

            // Restricciones para que no busque paginas que no existe
            if (obj.NumPagina > obj.totalPaginas - 1) obj.NumPagina = Convert.ToInt32(totalPag.Value);
            else if (obj.NumPagina < 0) obj.NumPagina = 0;

            using (var db = new SICOAdminEntities())
            {
                lstClients = db.SP_C_MostrarClientes(obj.NumPagina, obj.CantRegistros, obj.palabraBuscar, totalPag).ToList();
            }
            ViewBag.PagActual = obj.NumPagina + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn
            return PartialView("_TableClient", lstClients);
        }
    }
}
