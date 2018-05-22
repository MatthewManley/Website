namespace Domain.Settings
{
    public class ReCaptcha
    {
        public string UrlBase { get; set; }
        public string UrlEndpoint { get; set; }
        public string SiteKey { get; set; }
        public string SecretKey { get; set; }
    }
}
