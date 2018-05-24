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

        [Route("referredemail")]
        public IActionResult ReferredEmail(string referral)
        {
            var code = _appSettings.Referrals.FirstOrDefault(x => x.Code == referral);
            if (code == null)
            {
                return BadRequest();
            }
            return Ok(code.Email);
        }
    }
}