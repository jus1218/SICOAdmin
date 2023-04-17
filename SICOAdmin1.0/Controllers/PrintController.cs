using Rotativa;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SICOAdmin1._0.Controllers;
using SICOAdmin1._0.Models.User;

namespace SICOAdmin1._0.Controllers
{
    public class PrintController : Controller
    {
        // GET: Print
        public ActionResult Report()
        {
            //User objU = new User();

            return View();
        }
        public ActionResult Print(string pId)
        {
            string date = DateTime.Now.ToString("d");
            return new ViewAsPdf("Report")
            { FileName = "Estado de cuenta" + date +"(" + pId + ")" + ".pdf",
                PageSize = Rotativa.Options.Size.A4,
            PageOrientation = Rotativa.Options.Orientation.Landscape };
        }
    }
}