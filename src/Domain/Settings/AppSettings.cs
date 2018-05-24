namespace Domain.Settings
{
    public class AppSettings
    {
        public ReCaptcha ReCaptcha { get; set; }
        public string ContactEmail { get; set; }
        public Referral[] Referrals { get; set; }
    }
}
