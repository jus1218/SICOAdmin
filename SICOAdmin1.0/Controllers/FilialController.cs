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
    public class FilialController : Controller
    {

        #region Variables
        //LISTAS
        List<SP_C_MostrarFilial_Result> lstfiliales = null;

        // VARIABLES OUTPUT DEL PROCEDURE
        ObjectParameter msj = new ObjectParameter("msj", "");
        ObjectParameter seAgrego = new ObjectParameter("seAgrego", 1);

        //VARIABLES DE PAGINACION
        ObjectParameter totalPag = new ObjectParameter("totalPag", 0);
        int PagActual = 0;
        const int DEFAULT_NUMBER_PAGE = 1;
        #endregion
        // GET: Filial
        // ================================================= VISTAS =================================================
        #region Mostrar
        [AuthorizeUser(pAccion: 89)]
        public ActionResult Index()
        {
            try
            {
                using (var db = new SICOAdminEntities()) lstfiliales  = db.SP_C_MostrarFilial(PagActual, DEFAULT_NUMBER_PAGE, "", totalPag).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            ViewBag.PagActual = PagActual + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn
            return View(lstfiliales);
        }
        #endregion
        // ============================================= RETURN JSON ================================================
        #region CrearFilial
        [AuthorizeUser(pAccion: 49)]
        [HttpPost]
        public JsonResult CrearFilial(FILIAL obj)//
        {
            string error;

            obj.Estado = "1";
            try {
                using (var db = new SICOAdminEntities())
                {
                    db.SP_P_CrearFilial(obj.Descripcion, obj.Estado, ((User)Session["User"]).userName, msj, seAgrego);
                }
            }
            catch(Exception e)
            {
                error = e.ToString();

            }
            
            return Json(new
            {
                status = seAgrego.Value,
                mensaje = msj.Value
            }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Obtener Filial
        public JsonResult GetFilial(int id)
        {
            SP_C_BuscarFilial_Result objFilial = null;

            try
            {

                using (var db = new SICOAdminEntities()) objFilial = db.SP_C_BuscarFilial(id, false).First();
            }
            catch (Exception er)
            {
                Console.WriteLine(er.Message);
            }

            return Json(objFilial, JsonRequestBehavior.AllowGet);

        }
        #endregion

        // ============================================ PARTIAL_VIEW ================================================
        #region Tabla

        public PartialViewResult _TablaFilial(Pagina obj){
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
                lstfiliales = db.SP_C_MostrarFilial(obj.NumPagina, obj.CantRegistros, obj.palabraBuscar, totalPag).ToList();
            }
            ViewBag.PagActual = obj.NumPagina + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn
            return PartialView("_TablaFilial", lstfiliales);
        }

        #endregion

        #region Agregar

        [AuthorizeUser(pAccion: 49)]
        public PartialViewResult _AgregarFilial()
        {
            return PartialView("_AgregarFilial");
        }
        #endregion

        #region EditarFilial
        /**************************************************************************************/
        [AuthorizeUser(pAccion: 50)]
        public JsonResult EditarFilial(FILIAL obj)
        {

            ObjectParameter seModifico = new ObjectParameter("seModifico", 0);

            try
            {

                using (var db = new SICOAdminEntities())
                {
                    db.SP_P_ModificarFilial(obj.IdFilial, 
                                            obj.Descripcion, 
                                            ((User)Session["User"]).userName, 
                                            msj, 
                                            seModifico);
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

        /*************************************************************************************/
        #endregion

        #region EstadoPerfil 
        [AuthorizeUser(pAccion: 50)]
        public ActionResult ModificarEstadoFilial(int id)
        {
            ObjectParameter seModifico = new ObjectParameter("seModifico", 0);


            try
            {

                using (var db = new SICOAdminEntities())
                {
                    db.SP_P_ModificarEstadoFilial(id, msj, seModifico);
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

        #endregion


    }

}