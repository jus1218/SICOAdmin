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
    public class ConceptoController : Controller
    {
        //LISTAS
        List<SP_C_MostrarConceptos_Result> lstConceptos = null;


        // VARIABLES OUTPUT DEL PROCEDURE
        ObjectParameter msj = new ObjectParameter("msj", "");
        private ObjectParameter seAgrego = new ObjectParameter("seAgrego", 0);

        //VARIABLES DE PAGINACION
        ObjectParameter totalPag = new ObjectParameter("totalPag", 0);
        int PagActual = 0;

        // GET: Concepto
        [AuthorizeUser(pAccion: 79)]
        public ActionResult Index()
        {


            try
            {

                using (var db = new SICOAdminEntities()) lstConceptos = db.SP_C_MostrarConceptos(PagActual, 1, "", totalPag).ToList();

            }
            catch (Exception e)
            {


                Console.WriteLine(e.Message);

            }


            ViewBag.PagActual = PagActual + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn

            return View(lstConceptos);
        }

        [AuthorizeUser(pAccion: 78)]
        [HttpPost]
        public JsonResult CreateConcept(CONCEPTO obj)//
        {
            using (var db = new SICOAdminEntities())
            {
                db.SP_P_CreateConcept(obj.IdConcepto, obj.Alias, obj.Descripcion, obj.Tipo, obj.Unidad,
                    obj.Salarial, obj.Fijo, obj.Liquidable, obj.CantEditable, obj.MontoEditable,
                    obj.Periodicidad, obj.Activo, ((User)Session["User"]).userName, msj, seAgrego);
            }

            return Json(new
            {
                status = seAgrego.Value,
                mensaje = msj.Value
            }, JsonRequestBehavior.AllowGet);
        }



        public PartialViewResult _TablaConcepto(Pagina obj)
        {
            //Si no busca viene nulo
            if (obj.palabraBuscar == null) obj.palabraBuscar = "";

            // Validacion si el usuario esta buscado o solo pasando de pagina
            if (obj.accion.Equals('S')) obj.NumPagina += 1; //Enviar al SP
            else if (obj.accion.Equals('N')) obj.NumPagina -= 1;

            // Restricciones para que no busque paginas que no existe
            if (obj.NumPagina > obj.totalPaginas - 1) obj.NumPagina = Convert.ToInt32(totalPag.Value);
            else if (obj.NumPagina < 0) obj.NumPagina = 0;

            using (var db = new SICOAdminEntities()){
                lstConceptos = db.SP_C_MostrarConceptos(obj.NumPagina, obj.CantRegistros, obj.palabraBuscar, totalPag).ToList();
            }
            ViewBag.PagActual = obj.NumPagina + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn
            return PartialView("_TablaConcepto", lstConceptos);
        }

        [HttpPost]
        public JsonResult GetConcept(string id)
        {
            SP_C_BuscarConcepto_Result objConcept = null;

            try
            {
               
                using (var db = new SICOAdminEntities()) objConcept = db.SP_C_BuscarConcepto(int.Parse(id)).First();
            }
            catch (Exception er){
                Console.WriteLine(er.Message);
            }

            return Json(objConcept , JsonRequestBehavior.AllowGet);

        }

        [AuthorizeUser(pAccion: 80)]
        [HttpPost]
        public JsonResult EditConcept(CONCEPTO obj)
        {
            ObjectParameter seModifico = new ObjectParameter("seModifico", 0);

            try
            {

                using (var db = new SICOAdminEntities()) {
                    db.SP_P_ModificarConcepto(obj.IdConcepto, obj.Alias, obj.Descripcion,
                    obj.Tipo, obj.Unidad, obj.Salarial, obj.Fijo, obj.Liquidable, obj.CantEditable, obj.MontoEditable, obj.Periodicidad,
                    obj.Activo, ((User)Session["User"]).userName, msj, seModifico);
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