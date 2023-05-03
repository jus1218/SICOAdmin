using SICOAdmin1._0.Filters;
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
        const int DEFAULT_NUMBER_PAGE = 10;

        // GET: Proveedor
        // ================================================= VISTAS =================================================
        [AuthorizeUser(pAccion: 59)]
        public ActionResult Index()
        {
           

            try
            {

                using (var db = new SICOAdminEntities()) {
                    lstProveedores = db.SP_C_MostrarProveedores(PagActual, DEFAULT_NUMBER_PAGE, "", totalPag).ToList();
                    
                }

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

        
        public List<SelectListItem> ObtenerTipoProveedores() {
            List<SP_C_MostrarTiposProveedores_Result> lstTipoProveedor = null;
            List<SelectListItem> ddlTiposProveedores = null;


            try {
                using (var db = new SICOAdminEntities()) lstTipoProveedor = db.SP_C_MostrarTiposProveedores().ToList();

                ddlTiposProveedores = lstTipoProveedor.ConvertAll(d =>
                {
                    return new SelectListItem()
                    {
                        Text = "# " + d.IdTipoProveedor.ToString() + " - " + d.Nombre.ToString(),
                        Value = d.IdTipoProveedor.ToString(),
                        Selected = false
                    };
                });

            }
            catch (Exception er) {
                Console.WriteLine(er);
            }


            return ddlTiposProveedores;
        }

        // ============================================= RETURN JSON ================================================
        [AuthorizeUser(pAccion: 57)]
        [HttpPost]
        public JsonResult CrearProveedor(PROVEEDOR obj)//
        {
            obj.Activo = true;

            //obj.Telefono2 = obj.Telefono2 == null ? "" : obj.Telefono2;

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
                using (var db = new SICOAdminEntities()) objConcept = db.SP_C_BuscarProveedor(int.Parse(id),false).First();
            }
            catch (Exception er)
            {
                Console.WriteLine(er.Message);
            }

            return Json(objConcept, JsonRequestBehavior.AllowGet);

        }


        // ============================================ PARTIAL_VIEW ================================================



        //VIISTA RENDER
        public PartialViewResult _MostrarProveedores(Pagina obj)
        {
            obj.CantRegistros = obj.CantRegistros == 1 ? DEFAULT_NUMBER_PAGE : obj.CantRegistros;
            //Si no busca viene nulo
            if (obj.palabraBuscar == null) obj.palabraBuscar = "";

            // Validacion si el usuario esta buscado o solo pasando de pagina
            if (obj.accion.Equals('S')) obj.NumPagina += 1; //Enviar al SP
            else if (obj.accion.Equals('N')) obj.NumPagina -= 1;

            // Restricciones para que no busque paginas que no existe
            if (obj.NumPagina > obj.totalPaginas - 1) obj.NumPagina = Convert.ToInt32(totalPag.Value);
            else if (obj.NumPagina < 0) obj.NumPagina = 0;

            try
            {
//DEFAULT_NUMBER_PAGE
                using (var db = new SICOAdminEntities()) lstProveedores = db.SP_C_MostrarProveedores(obj.NumPagina, obj.CantRegistros, obj.palabraBuscar, totalPag).ToList();

            }
            catch (Exception e)
            {

                Console.WriteLine(e.Message);

            }

            ViewBag.palabraBuscar = obj.palabraBuscar;
            ViewBag.CantRegistros = obj.CantRegistros;

            ViewBag.PagActual = obj.NumPagina + 1;
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

        [AuthorizeUser(pAccion: 57)]
        public PartialViewResult _AgregarProveedor(){


            List<int?> lstActions = (List<int?>)HttpContext.Session["lstActions"];

            // Verificar si la acción actual está en la lista de acciones permitidas
            if (lstActions != null && lstActions.Contains(57))
            {
                ViewBag.lstTipoProveedor = ObtenerTipoProveedores();
                return PartialView("_AgregarProveedor");
            }



            //ViewBag.lstTipoProveedor = ObtenerTipoProveedores();


            return PartialView("_TableProveedor");
        }
        public PartialViewResult _DetalleProveedor(string id)
        {
            SP_C_BuscarProveedor_Result objProveedor = null;
            //List < SelectListItem > lstTipoProveedor = ObtenerTipoProveedores();
            //List<SP_C_MostrarTiposProveedores_Result> lstTipoProveedor = null;

            try
            {

                using (var db = new SICOAdminEntities()) {
                    objProveedor = db.SP_C_BuscarProveedor(int.Parse(id),false).First();
                    //lstTipoProveedor = db.SP_C_MostrarTiposProveedores().ToList();
                }
            }
            catch (Exception er)
            {
                Console.WriteLine(er.Message);
            }


            //var tipo = lstTipoProveedor.FirstOrDefault(p => p.IdTipoProveedor == objConcept.Tipo);
            //objProveedor.Tipo = tipo.Nombre;

            return PartialView("_DetalleProveedor", objProveedor);
        }
        [AuthorizeUser(pAccion: 58)]
        public PartialViewResult _EditarProveedorPage(string id)
        {
            SP_C_BuscarProveedor_Result objConcept = null;
            try
            {

                using (var db = new SICOAdminEntities()) objConcept = db.SP_C_BuscarProveedor(int.Parse(id), true).First();
            }
            catch (Exception er)
            {
                Console.WriteLine(er.Message);
            }


            //var tipo = objConcept.Tipo.Split(' ')[1];

            //objConcept.Tipo = tipo;


            ViewBag.lstTipoProveedor = ObtenerTipoProveedores();
            return PartialView("_EditarProveedor", objConcept);
        }
        [AuthorizeUser(pAccion: 58)]
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


        [AuthorizeUser(pAccion: 58)]
        public JsonResult ChangeState(int id)
        {
            ObjectParameter seModifico = new ObjectParameter("seModifico", 0);


            try
            {

                using (var db = new SICOAdminEntities())
                {
                    db.SP_P_CambiarEstadoProveedor(id, msj, seModifico);
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