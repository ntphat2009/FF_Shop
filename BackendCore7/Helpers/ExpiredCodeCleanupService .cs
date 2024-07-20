namespace BackendCore7.Helpers;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BackendCore7.Context;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public class ExpiredCodeCleanupService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly TimeSpan _checkInterval = TimeSpan.FromMinutes(1);

    public ExpiredCodeCleanupService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(_checkInterval, stoppingToken);

            using (var scope = _scopeFactory.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<MyDbContext>();
                var expiredCodes = context.ResetPasswordCodes.Where(c => c.expireCode <= DateTime.UtcNow);

                context.ResetPasswordCodes.RemoveRange(expiredCodes);
                await context.SaveChangesAsync();
            }
        }
    }
}
