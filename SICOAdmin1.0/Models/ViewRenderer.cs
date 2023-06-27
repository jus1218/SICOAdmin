using System;
using System.IO;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace SICOAdmin1._0.Models
{
    public class PartialViewRenderer
    {
        protected ControllerContext Context { get; set; }

        public PartialViewRenderer(ControllerContext controllerContext)
        {
            Context = controllerContext;
        }

        public string RenderPartialViewToString(string viewName, object model)
        {
            var viewData = new ViewDataDictionary(model);
            var tempData = new TempDataDictionary();
            var controllerContext = new ControllerContext(Context.RequestContext, Context.Controller);
            var razorViewEngine = new RazorViewEngine();
            var razorViewResult = razorViewEngine.FindPartialView(controllerContext, viewName, false);
            if (razorViewResult.View == null)
            {
                throw new InvalidOperationException($"La vista parcial '{viewName}' no se encontró");
            }
            var viewContext = new ViewContext(controllerContext, razorViewResult.View, viewData, tempData, TextWriter.Null);
            var stringWriter = new StringWriter();
            razorViewResult.View.Render(viewContext, stringWriter);
            return stringWriter.ToString();
        }
    }
}