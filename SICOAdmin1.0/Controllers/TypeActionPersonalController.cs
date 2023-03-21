using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity.Core.Objects;
using SICOAdmin1._0.Models.ActionType;
using SICOAdmin1._0.Models;
using SICOAdmin1._0.Models.User;

namespace SICOAdmin1._0.Controllers
{
    public class TypeActionPersonalController : Controller
    {
        
        List<SP_C_MostrarTipoAccionPers_Result> lstAcciones = new List<SP_C_MostrarTipoAccionPers_Result>();
        List<TypeActionPers> actions = new List<TypeActionPers>();

        SP_C_GetTipoAccionPers_Result typeActionResul = new SP_C_GetTipoAccionPers_Result();
        int PagActual = 0;
        ObjectParameter totalPag = new ObjectParameter("totalPag", 0);
        ObjectParameter msj = new ObjectParameter("msg", "");

        TypeActionPers action;
        public ActionResult Index()
        {

            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                lstAcciones = db.SP_C_MostrarTipoAccionPers(PagActual, 1, " ", totalPag).ToList();
            }

            List<TypeActionPers> ddlActionsTypePers = lstAcciones.ConvertAll
            (d =>
            {
                return new TypeActionPers()
                {
                    IdTypeActionPers = d.IdTipoAccionPers,
                    Description = d.Descripcion,
                    TypeAction = d.Tipo,
                    StatusEmployed = d.EstadoEmpleado,
                    ResetState = d.RestableceEstado,
                    UserCreation = d.UsuarioCreacion,
                    UserModification = d.UsuarioModificacion
                };
            }
            );

            ViewBag.lstTypeActionPersonal = ddlActionsTypePers;

            ViewBag.PagActual = PagActual + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn



            return View();
        }


        // ======================================= RETORNOS JSON =======================================

        [HttpPost]
        public JsonResult AgregarTypeActionPersonal(TypeActionPers obj)
        {
            int resp = 0;


            using (var db = new SICOAdminEntities())
            {
                db.SP_P_CrearTipoAccionPers(obj.Description, obj.TypeAction, obj.StatusEmployed, obj.ResetState, ((User)Session["User"]).userName, msj);
            }

            if (msj.Value.Equals("Tipo Accion creada correctamente")) resp = 1;
            return Json(new
            {
                resp = resp,
                mensaje = msj.Value
            }, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public JsonResult EditarTypeActionPersonal(TypeActionPers obj)
        {

            int resp = 0;

            using ( var db = new SICOAdminEntities())
            {

                db.SP_P_ModificarTipoAccionPers(obj.IdTypeActionPers, obj.Description, obj.TypeAction, obj.StatusEmployed, obj.ResetState, ((User)Session["User"]).userName, msj);
            }
            if (msj.Value.Equals("Tipo Accion modificada correctamente.")) resp = 1;


            return Json(new
            {
                resp = resp,
                mensaje = msj.Value
            }, JsonRequestBehavior.AllowGet);
        }

        // ======================================= VISTAS PARCIALES =======================================

        public PartialViewResult _TableTypeActionPers(Pagina obj)
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
                lstAcciones = db.SP_C_MostrarTipoAccionPers(obj.NumPagina, obj.CantRegistros, obj.palabraBuscar, totalPag).ToList();

            List<TypeActionPers> ddlActionsTypePers = lstAcciones.ConvertAll
          (d =>
              {
                  return new TypeActionPers()
                  {
                      IdTypeActionPers = d.IdTipoAccionPers,
                      Description = d.Descripcion,
                      TypeAction = d.Tipo,
                      StatusEmployed = d.EstadoEmpleado,
                      ResetState = d.RestableceEstado,
                      UserCreation = d.UsuarioCreacion,
                      UserModification = d.UsuarioModificacion
                  };
              }
          );




            //Datos a la vista
            ViewBag.PagActual = obj.NumPagina + 1;
            ViewBag.totalPag = totalPag;

            return PartialView("_TableTypeActionPers", ddlActionsTypePers);
        }

        public TypeActionPers GetTypeAction(short pId) {

            action = new TypeActionPers();
            using (var db = new SICOAdminEntities()) {
                typeActionResul = db.SP_C_GetTipoAccionPers(pId).First();
            }

            action.IdTypeActionPers = typeActionResul.IdTipoAccionPers;
            action.Description = typeActionResul.Descripcion;
            action.TypeAction = typeActionResul.Tipo;
            action.StatusEmployed = typeActionResul.EstadoEmpleado;
            action.ResetState = typeActionResul.RestableceEstado;
            action.UserCreation = typeActionResul.UsuarioCreacion;
            action.UserModification = typeActionResul.UsuarioModificacion;
            action.CreationDate = typeActionResul.FechaCreacion;
            action.ModificationDate = typeActionResul.FechaModificacion;
                return action;
        }

        public JsonResult showDataTypeAction(short pId) {

            var typeAction = GetTypeAction(pId);
            var obj = new
            {
                typeAction.IdTypeActionPers,
                typeAction.Description,
                typeAction.TypeAction,
                typeAction.StatusEmployed,
                typeAction.ResetState,
                typeAction.UserCreation,
                typeAction.UserModification,
                CreationDate = typeAction.CreationDate.ToString("dd/MM/yyyy H:mm:ss"),
                ModificationDate = typeAction.ModificationDate.ToString("dd/MM/yyyy H:mm:ss")

            };

            return Json(obj,JsonRequestBehavior.AllowGet);
        }
    }
}
