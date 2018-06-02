using System.Threading.Tasks;

namespace Domain
{
    public interface ICounterRepository
    {
        long GetValue(string id = null);
        long IncrementValue(string id = null);
        long DecrementValue(string id = null);
        Task<long> GetValueAsync(string id = null);
        Task<long> IncrementValueAsync(string id = null);
        Task<long> DecrementValueAsync(string id = null);
    }
}
