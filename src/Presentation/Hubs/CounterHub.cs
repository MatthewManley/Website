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
        private const int MaxRoomLength = 16;

        public CounterHub(ICounterRepository counterRepository)
        {
            _counterRepository = counterRepository;
        }

        public async Task Join(string room = "")
        {
            if (room.Length > MaxRoomLength)
                room = room.Substring(0, MaxRoomLength);

            var addToGroupTask = Groups.AddToGroupAsync(Context.ConnectionId, room);
            var count = await _counterRepository.GetValueAsync(room);
            await Task.WhenAll(
                Clients.Caller.SendAsync("UpdateCount", count),
                addToGroupTask);
        }

        public async Task Increment(string room = "")
        {
            if (room.Length > MaxRoomLength)
                room = room.Substring(0, MaxRoomLength);

            await Task.WhenAll(
                _counterRepository.IncrementValueAsync(room),
                Clients.OthersInGroup(room).SendAsync("Increment")
                );
        }

        public async Task Decrement(string room = "")
        {
            if (room.Length > MaxRoomLength)
                room = room.Substring(0, MaxRoomLength);

            await Task.WhenAll(
                _counterRepository.DecrementValueAsync(room),
                Clients.OthersInGroup(room).SendAsync("Decrement")
                );
        }
    }
}
