using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SICOAdmin1._0.Models;
using SICOAdmin1._0.Models.User;

namespace SICOAdmin1._0.Controllers
{
    public class AccessController : Controller
    {
        //Variables
        ObjectParameter resultado = new ObjectParameter("resultado", false);
        ObjectParameter mensaje = new ObjectParameter("mensaje", "");
        static int contG = 0;
        static string userG = "";

        //Clase para Json
        public partial class Atrributtes
        {
            public String User { get; set; }
            public String Pass { get; set; }
        }

        // GET: Access
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public JsonResult LoginJs(Atrributtes Obj)
        {
            try
            {
                using (SICOAdminEntities db = new SICOAdminEntities())
                {
                    db.SP_P_Logeo(Obj.User, Obj.Pass, resultado, mensaje);
                }
                bool bit = Convert.ToBoolean(resultado.Value);
                string message = Convert.ToString(mensaje.Value);

                if (bit)
                {
                    using (SICOAdminEntities db = new SICOAdminEntities())
                    {
                        SP_C_BuscarUsuario_Result user = db.SP_C_BuscarUsuario(Obj.User).FirstOrDefault();


                        User oUser = new User();

                        oUser.userName = user.Usuario;
                        oUser.name = user.Nombre;
                        switch (user.Tipo.ToString())
                        {
                            case "Ad":
                                oUser.type = TypesU.Administrador;
                                break;
                            case "Co":
                                oUser.type = TypesU.Consulta;
                                break;
                            case "Tr":
                                oUser.type = TypesU.Transaccional;
                                break;
                        }
                        oUser.active = user.Activo;
                        oUser.locked = user.Bloqueado;
                        oUser.password = user.Contrasena;
                        oUser.email = user.CorreoElectronico;
                        oUser.daysChangePassword = user.DiasCambioContrasena;
                        oUser.failesAttempts = user.IntentosFallidos;
                        oUser.lastChangedPassword = (DateTime)user.UltCambioContrasena;
                        oUser.lastEntry = user.UltIngreso;
                        oUser.userCreation = user.UsuarioCreacion;
                        oUser.dateCreation = user.FechaCreacion;
                        oUser.userModification = user.UsuarioModificacion;
                        oUser.dateModification = (DateTime)user.FechaModificacion;
                        Session["User"] = oUser; //Guardar el usuario loggeado
                        contG = 0;
                        userG = " ";

                        //Notificación de vencimiento de contraseña
                        String notification = message.Substring(19);

                        if (notification[0] != 'S')
                        {
                            Session["Notification"] = null;
                        }
                        else
                        {
                            Session["Notification"] = notification;
                        }


                        //CARGAMOS LOS PRIVILEGIOS
                        List<int?> lstActions = null;
                        lstActions = db.SP_C_AuthorizeUser(oUser.userName).ToList();
                        Session["lstActions"] = lstActions;
                    }
                }
                else
                {
                    string msg = IntentosPermitidos(Obj.User);
                    if (msg != null)
                    {
                        message = msg;
                        contG = 0;
                        userG = "";
                    }
                }
                return Json(new
                {
                    result = resultado.Value,
                    message = message
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                throw;
            }
        }

        public string IntentosPermitidos(string userName)
        {
            try
            {
                string msg = null;
                if (userG != null && userG == userName)
                {
                    contG = contG - 1;
                    if (contG == 0)
                    {
                        ObjectParameter mensajeB = new ObjectParameter("mensaje", "");
                        using (SICOAdminEntities db = new SICOAdminEntities())
                        {
                            db.SP_P_BloquearUsuario(userName, mensajeB);
                            msg = Convert.ToString(mensajeB.Value);
                        }
                    }

                }
                else
                {

                    using (SICOAdminEntities db = new SICOAdminEntities())
                    {
                        SP_C_BuscarUsuario_Result USER = db.SP_C_BuscarUsuario(userName).FirstOrDefault();
                        if (USER != null)
                        {
                            if (!USER.Bloqueado && USER.Activo)
                            {
                                userG = userName;
                                contG = USER.IntentosFallidos;
                                contG = contG - 1;
                            }
                        }
                    }
                }

                return msg;
            }
            catch (Exception ex)
            {
                Console.WriteLine( "Error: " + ex.Message);
                throw;
            }
        }
    }
}