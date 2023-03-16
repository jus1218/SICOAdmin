using SICOAdmin1._0.Models;
using SICOAdmin1._0.Models.User;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SICOAdmin1._0.Controllers
{
    public class ProveedorController : Controller
    {
        //LISTAS
        List<SP_C_MostrarProveedores_Result> lstProveedores = null;


        // VARIABLES OUTPUT DEL PROCEDURE
        ObjectParameter msj = new ObjectParameter("msj", "");
        private ObjectParameter seAgrego = new ObjectParameter("seAgrego", 0);

        //VARIABLES DE PAGINACION
        ObjectParameter totalPag = new ObjectParameter("totalPag", 0);
        int PagActual = 0;
        const int DEFAULT_NUMBER_PAGE = 1;

        // GET: Proveedor
        // ================================================= VISTAS =================================================
        public ActionResult Index()
        {

            try
            {

                using (var db = new SICOAdminEntities()) lstProveedores = db.SP_C_MostrarProveedores(PagActual, DEFAULT_NUMBER_PAGE, "", totalPag).ToList();

            }
            catch (Exception e)
            {


                Console.WriteLine(e.Message);

            }


            ViewBag.PagActual = PagActual + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn

            return View(lstProveedores);
        }
        // =============================================== FUNTIONS =================================================


        // ============================================= RETURN JSON ================================================
        [HttpPost]
        public JsonResult CrearProveedor(PROVEEDOR obj)//
        {
            obj.Activo = true;

            using (var db = new SICOAdminEntities())
            {
                db.SP_P_CrearProveedor(obj.Nombre, obj.Identificacion, obj.Tipo,
                    obj.Contacto, obj.Telefono1, obj.Telefono2, obj.CorreoElectronico,
                    obj.CondicionPago,obj.CuentaBancaria,obj.Banco,obj.Activo, ((User)Session["User"]).userName, msj, seAgrego);
            }
            return Json(new
            {
                status = seAgrego.Value,
                mensaje = msj.Value
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetSupplier(string id)
        {
            SP_C_BuscarProveedor_Result objConcept = null;

            try
            {

                using (var db = new SICOAdminEntities()) objConcept = db.SP_C_BuscarProveedor(int.Parse(id)).First();
            }
            catch (Exception er)
            {
                Console.WriteLine(er.Message);
            }

            return Json(objConcept, JsonRequestBehavior.AllowGet);

        }


        // ============================================ PARTIAL_VIEW ================================================



        //VIISTA RENDER
        public PartialViewResult _MostrarProveedores()
        {

            try
            {

                using (var db = new SICOAdminEntities()) lstProveedores = db.SP_C_MostrarProveedores(PagActual, DEFAULT_NUMBER_PAGE, "", totalPag).ToList();

            }
            catch (Exception e)
            {

                Console.WriteLine(e.Message);

            }


            ViewBag.PagActual = PagActual + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn


            return PartialView("_MostrarProveedores", lstProveedores);
        }



        public PartialViewResult _TablaProveedor(Pagina obj)
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
                lstProveedores = db.SP_C_MostrarProveedores(obj.NumPagina, obj.CantRegistros, obj.palabraBuscar, totalPag).ToList();
            }
            ViewBag.PagActual = obj.NumPagina + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn
            return PartialView("_TableProveedor", lstProveedores);
        }


        public PartialViewResult _AgregarProveedor()
        {

            return PartialView("_AgregarProveedor");
        }
        public PartialViewResult _DetalleProveedor(string id)
        {
            SP_C_BuscarProveedor_Result objConcept = null;
            try
            {

                using (var db = new SICOAdminEntities()) objConcept = db.SP_C_BuscarProveedor(int.Parse(id)).First();
            }
            catch (Exception er)
            {
                Console.WriteLine(er.Message);
            }

            return PartialView("_DetalleProveedor", objConcept);
        }
        public PartialViewResult _EditarProveedorPage(string id)
        {
            SP_C_BuscarProveedor_Result objConcept = null;
            try
            {

                using (var db = new SICOAdminEntities()) objConcept = db.SP_C_BuscarProveedor(int.Parse(id)).First();
            }
            catch (Exception er)
            {
                Console.WriteLine(er.Message);
            }

            return PartialView("_EditarProveedor", objConcept);
        }

        public JsonResult EditarProveedor(PROVEEDOR obj)
        {

            ObjectParameter seModifico = new ObjectParameter("seModifico", 0);

            try
            {

                using (var db = new SICOAdminEntities())
                {
                    db.SP_P_ModificarProveedor(obj.IdProveedor,obj.Nombre,obj.Identificacion,obj.Tipo,
                        obj.Contacto,obj.Telefono1,obj.Telefono2,obj.CorreoElectronico,obj.CondicionPago,obj.CuentaBancaria,
                        obj.Banco,obj.Activo, ((User)Session["User"]).userName, msj,seModifico);
                }
            }
            catch (Exception er)
            {
                Console.WriteLine(er.Message);
            }

            return Json(new
            {
                status = seModifico.Value,
                mensaje = msj.Value
            }, JsonRequestBehavior.AllowGet);
        }
    }

}