using System;
using System.Threading;
using System.Threading.Tasks;

namespace Domain
{
    public interface IRequestRepo
    {
        Task Insert(string ip, string referrer, string useragent, DateTime time);
        Task Insert(string ip, string referrer, string useragent, DateTime time, CancellationToken cancellationToken);
    }
}