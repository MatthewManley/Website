using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.SignalR;
using StackExchange.Redis;

namespace Presentation.Hubs
{
    public class CounterHub : Hub
    {
        private readonly ICounterRepository _counterRepository;

        public CounterHub(ICounterRepository counterRepository)
        {
            _counterRepository = counterRepository;
        }

        public async Task Get()
        {
            var count = await _counterRepository.GetValueAsync();
            await Clients.Caller.SendAsync("UpdateCount", count);
        }

        public async Task Increment()
        {
            var decrementTask = _counterRepository.IncrementValueAsync();
            var informOthersTask = Clients.Others.SendAsync("Increment");
            var remaining = new[]
            {
                decrementTask,
                informOthersTask
            };
            await Task.WhenAll(remaining);
        }

        public async Task Decrement()
        {
            var decrementTask = _counterRepository.DecrementValueAsync();
            var informOthersTask = Clients.Others.SendAsync("Decrement");
            var remaining = new[]
            {
                informOthersTask,
                decrementTask
            };
            await Task.WhenAll(remaining);
        }
    }
}
