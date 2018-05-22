using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Domain.Settings;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RestSharp;
using Services;

namespace Implementations
{
    public class RecaptchaVerifier : IRecaptchaVerifier
    {
        private readonly AppSettings appSettings;

        public RecaptchaVerifier(IOptions<AppSettings> options)
        {
            appSettings = options.Value;
        }

        public async Task<bool> Verify(string response, string ip)
        {
            var client = new RestClient(appSettings.ReCaptcha.UrlBase);
            var request = new RestRequest(appSettings.ReCaptcha.UrlEndpoint) { Method = Method.POST };
            request.AddParameter("secret", appSettings.ReCaptcha.SecretKey);
            request.AddParameter("response", response);
            //request.AddParameter("remoteip", ip);
            var resp = await client.ExecuteTaskAsync(request);
            if (resp.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }
            var typed = JsonConvert.DeserializeObject<Response>(resp.Content);
            return typed.Success;
        }
    }
}
