using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web.Mvc;
using SICOAdmin1._0.Filters;
using SICOAdmin1._0.Models;


namespace SICOAdmin1._0.Controllers
{
    public class PrintController : Controller
    {
        ////VARIABLES
        ObjectParameter totalPag = new ObjectParameter("totalPag", 0);

        // GET: Index
        [AuthorizeUser(pAccion: 94)]
        public ActionResult Index()
        {
            List<SP_C_MostrarClientes_Result> lstC = null;
            List<int> anios = null;


            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                lstC = db.SP_C_MostrarClientes(0, 20, "", totalPag).ToList();
                var result = from DOCUMENTO_CXC in db.DOCUMENTO_CXC select DOCUMENTO_CXC.FechaModificacion.Year;
                anios = result.ToList();
            }

            List<SelectListItem> Clients = lstC.ConvertAll(
                d =>
                {
                    return new SelectListItem()
                    {
                        Value = d.IdCliente.ToString(),
                        Text = d.Nombre,
                        Selected = false
                    };
                });

            List<SelectListItem> Anios = anios
                .Select(a => a).Distinct()
                .Select(a => new SelectListItem
                {
                    Value = a.ToString(),
                    Text = a.ToString()
                }).ToList();

            ViewBag.Clients = Clients;
            ViewBag.Anios = Anios;
            return View();
        }

        [HttpPost]
        public ActionResult GetStatementAcount(int pId, string pAnio)
        {
            List<SP_C_VerEstadoCuenta_Result> lstEC = null;
            try
            {
                using (var db = new SICOAdminEntities()) lstEC = db.SP_C_VerEstadoCuenta(pId, pAnio).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return PartialView("_Report", lstEC);
        }
    }
}