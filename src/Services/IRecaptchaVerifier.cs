using System.Threading.Tasks;

namespace Services
{
    public interface IRecaptchaVerifier
    {
        Task<bool> Verify(string response, string ip);
    }
}
