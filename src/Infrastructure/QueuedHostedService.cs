using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Microsoft.Extensions.Hosting;

namespace Infrastructure
{
    public class QueuedHostedService : IHostedService
    {
        private CancellationTokenSource _shutdown =
            new CancellationTokenSource();
        private Task _backgroundTask;

        public QueuedHostedService(IBackgroundTaskQueue taskQueue)
        {
            TaskQueue = taskQueue;
        }

        public IBackgroundTaskQueue TaskQueue { get; }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _backgroundTask = Task.Run(BackgroundProceessing);

            return Task.CompletedTask;
        }

        private async Task BackgroundProceessing()
        {
            while (!_shutdown.IsCancellationRequested)
            {
                var workItem =
                    await TaskQueue.DequeueAsync(_shutdown.Token);

                try
                {
                    await workItem(_shutdown.Token);
                }
                catch (Exception)
                {
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _shutdown.Cancel();

            return Task.WhenAny(_backgroundTask,
                Task.Delay(Timeout.Infinite, cancellationToken));
        }
    }
}
