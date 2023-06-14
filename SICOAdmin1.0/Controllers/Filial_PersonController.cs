using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SICOAdmin1._0.Models;
using SICOAdmin1._0.Models.Filial_Persona;
using System.Data.Entity.Core.Objects;
using SICOAdmin1._0.Models.User;
using SICOAdmin1._0.Filters;

namespace SICOAdmin1._0.Controllers
{
    public class Filial_PersonController : Controller
    {
        //LISTAS
        List<SP_C_MostrarFilialPersonasPag_Result> lstFilialPersons = null;

        //VARIABLES DE PAGINACION
        ObjectParameter totalPag = new ObjectParameter("totalPag", 0);
        int PagActual = 0;
        const int DEFAULT_NUMBER_PAGE = 1;

        // GET: Filial_Persons
        [AuthorizeUser(pAccion: 55)]
        public ActionResult Index()
        {
            List<SP_C_MostrarFiliales_Result> lstfilialesDB = null;

            try
            {

                using (var db = new SICOAdminEntities()) lstFilialPersons = db.SP_C_MostrarFilialPersonasPag(PagActual, DEFAULT_NUMBER_PAGE, "", totalPag).ToList();
                using (SICOAdminEntities db = new SICOAdminEntities())
                {
                    lstfilialesDB = db.SP_C_MostrarFiliales().ToList();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            List<SelectListItem> filials = lstfilialesDB.ConvertAll(
                 d =>
                 {
                     return new SelectListItem()
                     {
                         Value = d.IdFilial.ToString(),
                         Text = "Filial " + d.IdFilial,
                         Selected = false
                     };
                 });

            ViewBag.Filials = filials;

            ViewBag.PagActual = PagActual + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn

            return View(lstFilialPersons);
        }

        // GET: Filial_Person/Create
        [AuthorizeUser(pAccion: 53)]
        public ActionResult AddFilialPerson()
        {
            List<SP_C_MostrarFiliales_Result> lstfilialesDB = null;



            try
            {
                using (SICOAdminEntities db = new SICOAdminEntities())
                {
                    lstfilialesDB = db.SP_C_MostrarFiliales().ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                throw;
            }


            List<SelectListItem> filials = lstfilialesDB.ConvertAll(
                 d =>
                 {
                     return new SelectListItem()
                     {
                         Value = d.IdFilial.ToString(),
                         Text = "Filial " + d.IdFilial,
                         Selected = false
                     };
                 });
            ViewBag.Filials = filials;
            return View();
        }

        // POST: Filial_Person/Create
        [HttpPost]
        [AuthorizeUser(pAccion: 53)]
        public ActionResult AddFilialPerson(Filial_Person modelFP)
        {
            ObjectParameter resultado = new ObjectParameter("resultado", false);
            ObjectParameter mensaje = new ObjectParameter("mensaje", "");
            string Message = "";
            bool result = false;
            try
            {
                if (modelFP != null)
                {
                    using (var db = new SICOAdminEntities())
                    {
                        db.SP_P_CrearFilialPersona((byte)(modelFP.IdFilial), modelFP.Name, modelFP.Identification,
                                                   modelFP.Active, modelFP.Responsable, modelFP.Type, modelFP.Treatment, modelFP.Email,
                                                   modelFP.Telephone1, modelFP.Telephone2, modelFP.WhatsApp, ((User)Session["User"]).userName,
                                                   DateTime.Now, ((User)Session["User"]).userName, DateTime.Now, resultado, mensaje);


                        result = Convert.ToBoolean(resultado.Value);
                        Message = Convert.ToString(mensaje.Value);
                    }


                }

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // GET: Filial_Person/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Filial_Person/Edit/5
        [AuthorizeUser(pAccion: 54)]
        [HttpPost]
        public ActionResult UpdateFilialPerson(Filial_Person oFP)
        {
            ObjectParameter resultSP = new ObjectParameter("resultado", 0);
            ObjectParameter mensajeSP = new ObjectParameter("mensaje", 0);

            try
            {
                if (oFP != null)
                {
                    using (var db = new SICOAdminEntities())
                    {
                        db.SP_P_ModificarFilialPersona(oFP.Identification, oFP.Responsable, oFP.Type, oFP.Treatment, oFP.Email,
                                                       oFP.Telephone1, oFP.Telephone2, oFP.WhatsApp,
                                                       ((User)Session["User"]).userName, DateTime.Now, resultSP, mensajeSP);
                    }
                }

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //===========================================JsResults Section================================================
        public JsonResult GetBitacora(string pIdentification)
        {
            SP_C_MostrarFilialPersona_Result FilialPersonDB = new SP_C_MostrarFilialPersona_Result();
            Filial_Person oFP = new Filial_Person();

            try
            {
                using (SICOAdminEntities db = new SICOAdminEntities())
                {
                    FilialPersonDB = db.SP_C_MostrarFilialPersona(pIdentification, "one").FirstOrDefault();

                    oFP.UserCreation = FilialPersonDB.UsuarioCreacion;
                    oFP.DateCreation = FilialPersonDB.FechaCreacion;
                    oFP.UserModification = FilialPersonDB.UsuarioModificacion;
                    oFP.DateModification = FilialPersonDB.FechaModificacion;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                throw;
            }

            var objU = new
            {
                oFP.UserCreation,
                DateCreation = oFP.DateCreation.ToString("dd/MM/yyyy H:mm:ss"),
                oFP.UserModification,
                DateModification = oFP.DateModification.ToString("dd/MM/yyyy H:mm:ss"),
            };


            return Json(objU, JsonRequestBehavior.AllowGet);
        }

        [AuthorizeUser(pAccion: 54)]
        public JsonResult ActivFilialPerson(string pIdentification)
        {
            ObjectParameter resultado = new ObjectParameter("resultado", false);
            ObjectParameter mensaje = new ObjectParameter("mensaje", "");

            string message = "";
            bool result = false;

            try
            {
                using (SICOAdminEntities db = new SICOAdminEntities())
                {
                    db.SP_P_ActivarDesactivarFilialPersona(pIdentification, ((User)Session["User"]).userName, DateTime.Now, resultado, mensaje);
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
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                throw;
            }
            return Json(message, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInfoFP(String pIdentification)
        {
            SP_C_MostrarFilialPersona_Result FP_DB = new SP_C_MostrarFilialPersona_Result();
            Filial_Person modelFP = null;

            try
            {
                using (SICOAdminEntities db = new SICOAdminEntities())
                {
                    FP_DB = db.SP_C_MostrarFilialPersona(pIdentification, "one").First();
                }

                modelFP = new Filial_Person();

                modelFP.Identification = FP_DB.Indentification;
                modelFP.IdFilial = FP_DB.IdFilial;
                modelFP.Name = FP_DB.Nombre;
                modelFP.Active = FP_DB.Activo;
                modelFP.Responsable = FP_DB.Responsable;
                modelFP.Type = FP_DB.Tipo;
                modelFP.Email = FP_DB.CorreoElectronico;
                modelFP.Telephone1 = FP_DB.Telefono1;
                modelFP.Telephone2 = FP_DB.Telefono2;
                modelFP.WhatsApp = FP_DB.WhatsApp;
                modelFP.Treatment = FP_DB.Trato;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                throw;
            }
            var obj = new
            {
                modelFP.Identification,
                modelFP.IdFilial,
                modelFP.Name,
                modelFP.Active,
                modelFP.Responsable,
                modelFP.Type,
                modelFP.Email,
                modelFP.Telephone1,
                modelFP.Telephone2,
                modelFP.WhatsApp,
                modelFP.Treatment
            };

            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        //VIISTA RENDER
        public PartialViewResult _GetFilialPersons()
        {

            try
            {

                using (var db = new SICOAdminEntities()) lstFilialPersons = db.SP_C_MostrarFilialPersonasPag(PagActual, DEFAULT_NUMBER_PAGE, "", totalPag).ToList();

            }
            catch (Exception e)
            {

                Console.WriteLine(e.Message);

            }


            ViewBag.PagActual = PagActual + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn


            return PartialView("_GetFilialPersons", lstFilialPersons);
        }

        public PartialViewResult _TableFilialPerson(Pagina obj)
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
                lstFilialPersons = db.SP_C_MostrarFilialPersonasPag(obj.NumPagina, obj.CantRegistros, obj.palabraBuscar, totalPag).ToList();
            }
            ViewBag.PagActual = obj.NumPagina + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn
            return PartialView("_TableFilialPerson", lstFilialPersons);
        }
    }
}
