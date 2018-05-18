using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("api")]
    public class ApiController : Controller
    {
        [Route("email")]
        public IActionResult Email()
        {
            return Ok("test");
        }
    }
}