using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Domain.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Services;

namespace Presentation.Controllers
{
    [Route("api")]
    public class ApiController : Controller
    {
        private readonly IRecaptchaVerifier _recaptchaVerifier;
        private readonly AppSettings _appSettings;

        public ApiController(IRecaptchaVerifier recaptchaVerifier, IOptions<AppSettings> options)
        {
            _recaptchaVerifier = recaptchaVerifier;
            _appSettings = options.Value;
        }

        [Route("email")]
        public async Task<IActionResult> Email(string code)
        {
            var result = await _recaptchaVerifier.Verify(code, Request.HttpContext.Connection.RemoteIpAddress.ToString());
            if (result)
            {
                return Ok(_appSettings.ContactEmail);
            }
            return BadRequest();
        }

        [Route("sitekey")]
        public IActionResult SiteKey()
        {
            return Ok(_appSettings.ReCaptcha.SiteKey);
        }
    }
}