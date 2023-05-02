
using SICOAdmin1._0.Filters;
using SICOAdmin1._0.Models;
using SICOAdmin1._0.Models.User;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web.Mvc;
using System.Web.UI.WebControls;


namespace SICOAdmin.Controllers
{
    
    public class UserController : Controller
    {
        //Variables
        ObjectParameter resultado = new ObjectParameter("resultado", false);
        ObjectParameter mensaje = new ObjectParameter("mensaje", "");

        List<SP_P_PerfilesDelUsuario_Result> lstUsuariosPerfil = null;
        List<SP_P_PerfilesDelUsuario_Result> lstPerfiles = null;
        List<f_opcionesPerfilesUsuario_Result> viewPerfiles = null;
        public string usuario = "";
        //Varibles para la tabla asincronica
        ObjectParameter totalPag = new ObjectParameter("totalPag", 0);
        int PagActual = 0;


        //LISTAS
        List<SP_C_MostrarUsuariosPag_Result> lstUsers = null;

        //VARIABLES DE PAGINACION
        ObjectParameter totalPagi = new ObjectParameter("totalPag", 0);
        int PagiActual = 0;
        const int DEFAULT_NUMBER_PAGE = 1;

        //Cambio de contraseña
        public class ChangePass
        {
            public string PassAct { get; set; }
            public string PassNew { get; set; }
            public string UserName { get; set; }
        }

        // GET: User
        [AuthorizeUser(pAccion: 10)]
        public ActionResult Index()
        {

            try
            {

                using (var db = new SICOAdminEntities()) lstUsers = db.SP_C_MostrarUsuariosPag(PagiActual, DEFAULT_NUMBER_PAGE, "", totalPagi).ToList();
            }
            catch (Exception e)
            {


                Console.WriteLine(e.Message);

            }

            ViewBag.PagActual = PagiActual + 1;
            ViewBag.totalPag = totalPagi;

            return View(lstUsers);
        }
        [AuthorizeUser(pAccion: 8)]
        [HttpGet]
        public ActionResult addUser()
        {
            return View();
        }

        [AuthorizeUser(pAccion: 8)]
        [HttpPost]
        public ActionResult addUser(User model)
        {

            try
            {
                if (model != null)
                {
                    using (var db = new SICOAdminEntities())
                    {
                        int num = db.SP_P_AddUser(model.userName, model.name, Convert.ToString(model.type), model.active, model.locked,
                                  model.password, model.email, model.daysChangePassword, (byte)model.failesAttempts,
                                  ((User)Session["User"]).userName, ((User)Session["User"]).userName, resultado, mensaje);
                    }

                    bool bit = Convert.ToBoolean(resultado.Value);
                    string message = Convert.ToString(mensaje.Value);

                    if (bit)
                    {
                        TempData.Clear();
                        TempData["MessageAdd"] = "1" + message;
                        return RedirectToAction(Url.Content("/Index"));
                    }
                    else
                    {
                        TempData.Clear();
                        TempData["MessageAdd"] = "0" + message;
                        return RedirectToAction(Url.Content("/Index"));
                    }
                }
                return View(model);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [AuthorizeUser(pAccion: 9)]
        public ActionResult Edit(string userName)
        {
            List<SP_C_BuscarUsuario_Result> lst = null;


            ViewBag.usuarioLog = userName;
            usuario = userName;
            ViewBag.perfilEliminar = 0;

            User objM = new User();



            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                lst = db.SP_C_BuscarUsuario(userName).ToList();
                lstPerfiles = db.SP_P_PerfilesDelUsuario(userName, PagActual, 1, "", totalPag).ToList();
                viewPerfiles = db.f_opcionesPerfilesUsuario(userName).ToList();
            }

            foreach (var e in lst)
            {
                objM.userName = e.Usuario;
                objM.name = e.Nombre;
                switch (e.Tipo.ToString())
                {
                    case "Ad":
                        objM.type = TypesU.Administrador;
                        break;
                    case "Co":
                        objM.type = TypesU.Consulta;
                        break;
                    case "Tr":
                        objM.type = TypesU.Transaccional;
                        break;
                }
                objM.active = e.Activo;
                objM.locked = e.Bloqueado;
                objM.password = e.Contrasena;
                objM.email = e.CorreoElectronico;
                objM.daysChangePassword = e.DiasCambioContrasena;
                objM.failesAttempts = e.IntentosFallidos;
                objM.lastChangedPassword = (DateTime)e.UltCambioContrasena;
                objM.lastEntry = e.UltIngreso;
                objM.userCreation = e.UsuarioCreacion;
                objM.dateCreation = e.FechaCreacion;
                objM.userModification = e.UsuarioModificacion;
                objM.dateModification = (DateTime)e.FechaModificacion;
            }

            //lstPerfiles.ForEach(p => p = perfil);
            //Lista de perfiles donde esta el usuario
            List<SelectListItem> ddlperfiles = viewPerfiles.ConvertAll(d =>
            {
                return new SelectListItem()
                {
                    Text = d.Descripcion.ToString(),
                    Value = d.IdPerfil.ToString(),
                    Selected = false
                };
            });

            ViewBag.PagActual = PagActual + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn

            ViewBag.userPerfil = lstPerfiles;
            ViewBag.viewPerfiles = ddlperfiles;

            return View(objM);
        }

        [AuthorizeUser(pAccion: 9)]
        [HttpPost]
        public ActionResult updateUser(User user)
        {
            try
            {

                if (user != null)
                {
                    using (var db = new SICOAdminEntities())
                    {
                        db.SP_P_ModificarUsuario(user.userName, user.name, Convert.ToString(user.type), user.active, user.locked, user.password,
                                                user.email, user.daysChangePassword, (byte)user.failesAttempts,
                                                ((User)Session["User"]).userName, DateTime.Now, resultado, mensaje);

                        bool bit = Convert.ToBoolean(resultado.Value);
                        string message = Convert.ToString(mensaje.Value);

                        if (bit)
                        {
                            TempData.Clear();
                            TempData["MessageUp"] = "1" + message;
                            return RedirectToAction(Url.Content("/Index"));
                        }
                        else
                        {
                            TempData.Clear();
                            TempData["MessageUp"] = "0" + message;
                            return RedirectToAction(Url.Content("/Index"));
                        }
                    }
                    //return RedirectToAction(Url.Content("/Index"));
                }
                return View(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // ############################################## ASOCIACIONES USUARIO CON PERFIL ##############################################
        [AuthorizeUser(pAccion: 34)]
        [HttpPost]
        public JsonResult agregarUsuarioPerfil(UsuarioPerfil obj)//
        {
            int resp = 0;
            using (var db = new SICOAdminEntities())
            {
                resp = db.SP_P_CrearUsuarioPerfil(obj.Usuario, obj.IdPerfil, ((User)Session["User"]).userName);
            }

            return Json(resp, JsonRequestBehavior.AllowGet);
        }

        [AuthorizeUser(pAccion: 35)]
        [HttpPost]
        public JsonResult EliminarUsuarioPerfil(UsuarioPerfil obj)//
        {
            int resp = 0;
            using (var db = new SICOAdminEntities())
            {
                resp = db.SP_P_EliminarUsuarioPerfil(obj.Usuario, obj.IdPerfil);
            }

            return Json(resp, JsonRequestBehavior.AllowGet);
        }




        // ############################################## VISTAS PARCIALES ##############################################
        public PartialViewResult _PerfilesUsuario(Pagina obj)//int id
        {
            //Si no busca viene nulo
            if (obj.palabraBuscar == null) obj.palabraBuscar = "";

            // Validacion si el usuario esta buscado o solo pasando de pagina
            //if (!(obj.estaBuscando))
            //{
                if (obj.accion.Equals('S')) obj.NumPagina += 1; //Enviar al SP
                else if (obj.accion.Equals('N')) obj.NumPagina -= 1;
            //}
            //else ViewBag.PagActual = obj.NumPagina;

            // Restricciones para que no busque paginas que no existe
            if (obj.NumPagina > obj.totalPaginas - 1) obj.NumPagina = Convert.ToInt32(totalPag.Value);
            else if (obj.NumPagina < 0) obj.NumPagina = 0;



            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                lstUsuariosPerfil = db.SP_P_PerfilesDelUsuario(obj.Usuario, obj.NumPagina, obj.CantRegistros, obj.palabraBuscar, totalPag).ToList();
            }





            //Datos a la vista
            ViewBag.PagActual = obj.NumPagina + 1;
            ViewBag.totalPag = totalPag;
            return PartialView("_PerfilesUsuario", lstUsuariosPerfil);
        }



        public PartialViewResult _SelectOpcProfile(string id)//int id
        {
            List<f_opcionesPerfilesUsuario_Result> opcUsuario = null;
            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                opcUsuario = db.f_opcionesPerfilesUsuario(id).ToList();
            }

            List<SelectListItem> ddlUsuarios = opcUsuario.ConvertAll(d =>
            {
                return new SelectListItem()
                {
                    Text = d.Descripcion.ToString(),
                    Value = d.IdPerfil.ToString(),
                    Selected = false
                };
            });


            return PartialView("_SelectOpcProfile", ddlUsuarios);
        }


        public JsonResult GetBitacora(string userName)
        {
            User oUser = new User();
            SP_C_MostrarUsuarios_Result user = new SP_C_MostrarUsuarios_Result();
            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                user = db.SP_C_MostrarUsuarios("BIT", userName).FirstOrDefault();

                oUser.lastEntry = user.UltIngreso;
                oUser.lastChangedPassword = (DateTime)user.UltCambioContrasena;
                oUser.userCreation = user.UsuarioCreacion;
                oUser.dateCreation = user.FechaCreacion;
                oUser.userModification = user.UsuarioModificacion;
                oUser.dateModification = (DateTime)user.FechaModificacion;
            }

            var objU = new
            {
                lastEntry = oUser.lastEntry.ToString("dd/MM/yyyy H:mm:ss"),
                lastChangedPassword = oUser.lastChangedPassword.ToString("dd/MM/yyyy H:mm:ss"),
                oUser.userCreation,
                dateCreation = oUser.dateCreation.ToString("dd/MM/yyyy H:mm:ss"),
                oUser.userModification,
                dateModification = oUser.dateModification.ToString("dd/MM/yyyy H:mm:ss"),
            };


            return Json(objU, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CambiarContrasena(ChangePass objPass)
        {
            string message = " ";
            if(String.IsNullOrEmpty(objPass.UserName))
            {
                objPass.UserName = ((User)Session["User"]).userName;
            }

            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                db.SP_P_CambioContrasena(objPass.UserName, objPass.PassAct, objPass.PassNew, resultado, mensaje);

                message = Convert.ToString(mensaje.Value);
            }


            return Json(new
            {
                result = resultado.Value,
                message = message
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LockUser(string userName)
        {
            ObjectParameter resultado = new ObjectParameter("resultado", false);
            ObjectParameter mensaje = new ObjectParameter("mensaje", "");

            string message = "";
            bool result = false;

            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                db.SP_P_ModificarEstadosUsuario( userName, ((User)Session["User"]).userName, "lock", resultado, mensaje);
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

        public JsonResult ActivUser(string userName)
        {
            ObjectParameter resultado = new ObjectParameter("resultado", false);
            ObjectParameter mensaje = new ObjectParameter("mensaje", "");

            string message = "";
            bool result = false;

            using (SICOAdminEntities db = new SICOAdminEntities())
            {
                db.SP_P_ModificarEstadosUsuario(userName, ((User)Session["User"]).userName, "Activ", resultado, mensaje);
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

        //Paginación
        public PartialViewResult _GetUser()
        {

            try
            {

                using (var db = new SICOAdminEntities()) lstUsers = db.SP_C_MostrarUsuariosPag(PagiActual, DEFAULT_NUMBER_PAGE, "", totalPagi).ToList();

            }
            catch (Exception e)
            {

                Console.WriteLine(e.Message);

            }


            ViewBag.PagActual = PagActual + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn


            return PartialView("_GetUser", lstUsers);
        }

        public PartialViewResult _TableUser(Pagina obj)
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
                lstUsers = db.SP_C_MostrarUsuariosPag(obj.NumPagina, obj.CantRegistros, obj.palabraBuscar, totalPag).ToList();
                //lstFilialPersons = db.SP_C_MostrarFilialPersonasPag(0, 1, "", totalPag).ToList();
            }
            ViewBag.PagActual = obj.NumPagina + 1;
            ViewBag.totalPag = totalPag;//Total de veces que puede tocar el btn
            return PartialView("_TableUser", lstUsers);
        }
    }
}
