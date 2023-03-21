using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


using SICOAdmin1._0.Models;
using SICOAdmin1._0.Models.Departure;
using System.Data.Entity.Core.Objects;
using SICOAdmin1._0.Models.User;


namespace SICOAdmin1._0.Controllers
{
    public class DepartureController : Controller
    {
        // Lista que viene de la consulta a la Base de Datos 
        List<SP_C_MostrarPartidas_Result> DeparturesDB = new List<SP_C_MostrarPartidas_Result>();

        //Objeto que se utiliza para poder settear los datos a una nueva lista


        // Lista que se usará para poder mostrar los datos en la vista
        // y la cual se recurre en caso de extraer un objeto
        List<Departure> LstDepartures = new List<Departure>();

        int PagActual = 0;
        //Atributos para los Store Procedure
        ObjectParameter totalPag = new ObjectParameter("totalPag", 0);
        ObjectParameter msj = new ObjectParameter("msj", " ");
        ObjectParameter res = new ObjectParameter("res", 0);
        public ActionResult Index()
        {


            ViewBag.lstDepartures = GetDeparturesDB(PagActual, 10, " ");

            ViewBag.PagActual = PagActual + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn


            return View();
        }
        //=========== VISTAS PARCIALES ========================
        public PartialViewResult _TableDeparture(Pagina obj)
        {


            //Si no busca viene nulo
            if (obj.palabraBuscar == null) obj.palabraBuscar = "";

            // Validacion si el usuario esta buscado o solo pasando de pagina
            if (obj.accion.Equals('S')) obj.NumPagina += 1; //Enviar al SP
            else if (obj.accion.Equals('N')) obj.NumPagina -= 1;

            // Restricciones para que no busque paginas que no existe
            if (obj.NumPagina > obj.totalPaginas - 1) obj.NumPagina = Convert.ToInt32(totalPag.Value);
            else if (obj.NumPagina < 0) obj.NumPagina = 0;


            //Datos a la vista
            ViewBag.PagActual = obj.NumPagina + 1;
            ViewBag.totalPag = totalPag;

            //Se prueba a ver si funciona así.

            //Mandando la lista de una vez, para no hacer muchas consultas
            //a la Base de datos



            LstDepartures.Clear();
            LstDepartures = GetDeparturesDB(obj.NumPagina, obj.CantRegistros, obj.palabraBuscar);
            return PartialView("_TableDeparture", LstDepartures);
        }

        //==================== FUNCIONES FETCH ======================

        public JsonResult AgregarDeparture(Departure pDeparture)
        {
            short resp = 0;
            using (var db = new SICOAdminEntities())
            {

                db.SP_P_CrearPartida(pDeparture.Alias, pDeparture.Description, pDeparture.TypeDep, pDeparture.Active,
                  ((User)Session["User"]).userName, res, msj);
            }

            if (res.Value.Equals(true)) resp = 1;
            return Json(new
            {
                resp = resp,
                msj = msj.Value
            }, JsonRequestBehavior.AllowGet);


        }

        public JsonResult EditarDeparture(Departure pDeparture)
        {
            short resp = 0;
            using (var db = new SICOAdminEntities())
            {

                db.SP_P_ModificarPartida(pDeparture.IdPartida, pDeparture.Alias, pDeparture.Description,
                    pDeparture.TypeDep, pDeparture.Active, ((User)Session["User"]).userName, res, msj);
            }
            if (res.Value.Equals(true)) resp = 1;
            return Json(new
            {
                resp = resp,
                msj = msj.Value
            }, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        //Activa o desactiva la Partida 
        public JsonResult ModificarEstadoDeparture(Departure obj)
        {

            //Cambia el valor de la variable, si viene true a false

            obj.Active = !obj.Active;
            
            using (var db = new SICOAdminEntities())
            {
                db.SP_P_ModificarEstadoPartida(obj.IdPartida,obj.Active, ((User)Session["User"]).userName, res, msj);
            }
            return Json(new
            {
                resp = res.Value,
                msj = msj.Value
            }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ShowDataDeparture(int pId)
        {

            var d = GetDeparture(pId);
            return Json(d, JsonRequestBehavior.AllowGet);
        }

        //=========== CONSULTAS A LA BASE DE DATOS ================

        public List<Departure> GetDeparturesDB(int NumPagina,int CantRegistros,string palabraBuscar)
        {

            DeparturesDB.Clear();
            LstDepartures.Clear();
            using (var db = new SICOAdminEntities())
            {                                                                                  //Variable Global 
                DeparturesDB = db.SP_C_MostrarPartidas(NumPagina, CantRegistros, palabraBuscar, totalPag).ToList();
            }

            LstDepartures = DeparturesDB.ConvertAll(
                    d =>
                    {
                        //Se Asignan los atributos 
                        return new Departure
                        {
                            IdPartida = d.IdPartida,
                            Alias = d.Alias,
                            Description = d.Descripcion,

                            TypeDep = d.Tipo,
                            Active = d.Activo,

                            UserCreation = d.UsuarioCreacion,
                            DateCreation = d.FechaCreacion,

                            DateModification = d.FechaModificacion,
                            UserModification = d.UsuarioModificacion
                        };
                    }
                );
            return LstDepartures;
        }

        public Object GetDeparture(int IdDeparture)
        {
            var d = new SP_C_GetPartida_Result();
            using (var db = new SICOAdminEntities())
            {
                d = db.SP_C_GetPartida(IdDeparture).First();
            }

            var obj = new
            {

                IdPartida = d.IdPartida,
                Alias = d.Alias,
                Description = d.Descripcion,

                TypeDep = d.Tipo,
                Active = d.Activo,

                UserCreation = d.UsuarioCreacion,
                CreationDate = d.FechaCreacion.ToString("dd/MM/yyyy H:mm:ss"),

                ModificationDate = d.FechaModificacion.ToString("dd/MM/yyyy H:mm:ss"),
                UserModification = d.UsuarioModificacion
            };

            return obj;
        }

    }
}
