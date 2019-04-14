using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using MonteCarloEarth.ExternalApi;
using MonteCarloEarth.ExternalApi.Geocoding;
using MonteCarloEarth.MockApi;
using System.Diagnostics;
using MonteCarloEarth.Mock;
using MonteCarloEarth.Repository;

namespace MonteCarloEarth
{
    public class Startup
    {

        private IConfiguration configuration { get; }
        private IHostingEnvironment environment { get; }

        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            this.configuration = configuration;
            this.environment = environment;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            string connectionString = configuration.GetConnectionString("mongo");
            if (connectionString == null || !environment.IsProduction())
            {
                if (!environment.IsProduction()) //development
                {
                    Trace.WriteLine("Aplication running in non-development mode with mock services.");
                }
                else if (connectionString == null) //production, but configuration is missing
                {
                    Trace.WriteLine("Configuration data not supplied! Configuration pattern is " +
                    "stored in __appsettings.json file."); 
                }

                services.AddSingleton<IPointRepository, MockRepository>();
                services.AddSingleton<IGeocodingProvider, GeocodingMockApi>();
                services.AddSingleton<IOnWaterProvider, OnWaterMockProvider>();
            }
            else
            {
                services.AddSingleton<IPointRepository, PointRepository>();
                services.AddSingleton<IGeocodingProvider, GeocodingApiProvider>();
                services.AddSingleton<IOnWaterProvider, OnWaterApiProvider>();
                services.AddSingleton(new MongoClient(connectionString));
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseStaticFiles();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
