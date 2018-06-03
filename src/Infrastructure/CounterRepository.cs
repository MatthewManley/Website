using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Domain;
using StackExchange.Redis;

namespace Infrastructure
{
    public class CounterRepository : ICounterRepository
    {
        private readonly IDatabase _database;

        public CounterRepository(IConnectionMultiplexer connectionMultiplexer)
        {
            _database = connectionMultiplexer.GetDatabase();
        }

        private string ConvertKey(string key)
        {
            return "counter:" + key;
        }

        public long GetValue(string id = null)
        {
            var key = ConvertKey(id);
            var value = _database.StringGet(key);
            if (!value.HasValue)
            {
                return 0L;
            }
            long.TryParse(value.ToString(), out var result);
            return result;
        }

        public long IncrementValue(string id = null)
        {
            var key = ConvertKey(id);
            return _database.StringIncrement(key);
        }

        public long DecrementValue(string id = null)
        {
            var key = ConvertKey(id);
            return _database.StringDecrement(key);
        }

        public async Task<long> GetValueAsync(string id = null)
        {
            var key = ConvertKey(id);
            var value = await _database.StringGetAsync(key);
            if (!value.HasValue)
            {
                return 0L;
            }
            long.TryParse(value.ToString(), out var result);
            return result;
        }

        public async Task<long> IncrementValueAsync(string id = null)
        {
            var key = ConvertKey(id);
            return await _database.StringIncrementAsync(key);
        }

        public async Task<long> DecrementValueAsync(string id = null)
        {
            var key = ConvertKey(id);
            return await _database.StringDecrementAsync(key);
        }
    }
}
