using SICOAdmin1._0.Models;
using SICOAdmin1._0.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SICOAdmin1._0.Filters
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class AuthorizeUser : AuthorizeAttribute
    {
        private User objUser;
        //private MiSistemasEntitites db = new MiSistemasEntitites();
        private int accion;

        private static Dictionary<int, string> listaAcciones = new Dictionary<int, string>() // numero de accion , url de vistas parciales
        {
            {57, "~/Proveedor/_MostrarProveedores"},
            {58, "~/Proveedor/_MostrarProveedores"}
        };


        public AuthorizeUser(int pAccion)
        {
            this.accion = pAccion;
        }



        public override void OnAuthorization(AuthorizationContext filterContext)
        {


            //base.OnAuthorization(filterContext);
            List<int?> lstActions = null;

            try
            {
                objUser = (User)HttpContext.Current.Session["User"];

                if (objUser != null)
                {
                    using (SICOAdminEntities db = new SICOAdminEntities())
                    {
                        lstActions = db.SP_C_AuthorizeUser(objUser.userName).ToList();
                    }

                    HttpContext.Current.Session["lstActions"] = lstActions;

                    //lstActions.Count() < 1
                    if (!(lstActions.Contains(accion)))
                    {//Por si no tiene permisos


                        /*Excepcion: Esto es para las vistas que cargan en un contenedor que no es el principal
                         Ejemplo: las vistas parciales*/
                        if (listaAcciones.ContainsKey(accion))
                        {
                            string url = listaAcciones[accion];
                            filterContext.Result = new RedirectResult(url);// "~/Proveedor/_MostrarProveedores"
                            return;
                        }


                        filterContext.Result = new RedirectResult("~/Home/Index");
                        return;

                        //filterContext.Result = null;
                    }
                }

            }
            catch (Exception e)
            {
                filterContext.Result = new RedirectResult("~/Home/Index");
            }


        }
    }


    struct verificar
    {
        public int numeroAccion;
        public string url;
    }




}