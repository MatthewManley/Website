using Domain;
using Domain.Settings;
using Implementations;
using Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Services;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Presentation.Hubs;
using StackExchange.Redis;

namespace Presentation
{
    public class Startup
    {
        private readonly Microsoft.AspNetCore.Hosting.IHostingEnvironment env;

        public Startup(Microsoft.AspNetCore.Hosting.IHostingEnvironment environment, IConfiguration configuration)
        {
            env = environment;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public async void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.Configure<AppSettings>(Configuration);
            services.AddTransient<IRecaptchaVerifier, RecaptchaVerifier>();
            services.AddSingleton<IHostedService, QueuedHostedService>();
            services.AddSingleton<IBackgroundTaskQueue, BackgroundTaskQueue>();
            services.AddTransient<IRequestRepo, RequestRepo>();
            services.AddTransient<ICounterRepository, CounterRepository>();

            services.AddSingleton<IConnectionMultiplexer>(provider => ConnectionMultiplexer.Connect("localhost"));

            services.AddSignalR();


            if (env.IsDevelopment())
            {
                services.AddNodeServices(options =>
                {
                    options.LaunchWithDebugging = true;
                    options.DebuggingPort = 9229;
                });
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");

                app.UseForwardedHeaders(new ForwardedHeadersOptions
                {
                    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
                });
            }

            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseSignalR(routes =>
            {
                routes.MapHub<CounterHub>("/counterhub");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
