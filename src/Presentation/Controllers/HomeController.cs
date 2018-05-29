using Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;
using System.Linq;

namespace Presentation.Controllers
{
    public class HomeController : Controller
    {
        private readonly IBackgroundTaskQueue _queue;
        private readonly IRequestRepo _requestRepo;
        private readonly bool _isProduction;

        public HomeController(IHostingEnvironment env, IBackgroundTaskQueue queue, IRequestRepo requestRepo)
        {
            _queue = queue;
            _requestRepo = requestRepo;
            _isProduction = env.IsProduction();
        }

        public IActionResult Index()
        {
            var queryReferrer = Request.Query["ref"].FirstOrDefault();
            if (!string.IsNullOrEmpty(queryReferrer))
            {
                Response.Cookies.Append("referrer", queryReferrer, new CookieOptions
                {
                    Domain = Request.Host.Host,
                    Path = "/",
                    SameSite = SameSiteMode.Strict,
                    Secure = _isProduction,
                    Expires = DateTimeOffset.Now.AddDays(90)
                });
            }
            var cookieReferrer = Request.Cookies["referrer"];
            var referrer = queryReferrer ?? cookieReferrer;
            var ip = Request.Headers["X-Forwarded-For"];
            var userAgent = Request.Headers.FirstOrDefault(x => x.Key.ToLower() == "user-agent").Value
                .Aggregate((x, y) => x + ", " + y);
            _queue.QueueBackgroundWorkItem(async (token) =>
            {
                await _requestRepo.Insert(ip, referrer, userAgent, DateTime.Now, token);
            });
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
