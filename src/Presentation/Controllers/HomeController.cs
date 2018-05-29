using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    public class HomeController : Controller
    {
        private readonly bool _isProduction;

        public HomeController(IHostingEnvironment env)
        {
            _isProduction = env.IsProduction();
        }

        public IActionResult Index()
        {
            var referrer = Request.Query["ref"].FirstOrDefault();
            if (!string.IsNullOrEmpty(referrer))
            {
                Response.Cookies.Append("referrer", referrer, new CookieOptions
                {
                    Domain = Request.Host.Host,
                    Path = "/",
                    SameSite = SameSiteMode.Strict,
                    Secure = _isProduction,
                    Expires = DateTimeOffset.Now.AddDays(90)
                });
            }
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
