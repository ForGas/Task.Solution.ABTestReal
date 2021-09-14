using System;
using Serilog;
using System.Threading.Tasks;
using Task_WebSolution.Context;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Task_WebSolution.Services;

namespace Task_WebSolution
{
    public class Program
    {
        public static async Task<int> Main(string[] args)
        {
            try
            {
                Log.Information("Starting web host");

                var host = CreateHostBuilder(args).Build();
                using (var scope = host.Services.CreateScope())
                    await DbInitializer.InitializeAsync(scope.ServiceProvider);

                host.Run();
                return 0;
            }
            catch (Exception ex)
            {
                if (Log.Logger == null || Log.Logger.GetType().Name == "SilentLogger")
                {
                    Log.Logger = new LoggerConfiguration()
                        .MinimumLevel.Debug()
                        .WriteTo.Console()
                        .CreateLogger();
                }

                Log.Fatal(ex, "Host terminated unexpectedly");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>()
                    .CaptureStartupErrors(true)
                    .ConfigureAppConfiguration(config =>
                    {
                        config.AddJsonFile("appsettings.Development.json", optional: true);
                    })
                    .UseSerilog((hostingContext, loggerConfiguration) =>
                    {
                        loggerConfiguration
                            .Enrich.FromLogContext()
                            .WriteTo.Console()
                            .ReadFrom.Configuration(hostingContext.Configuration)
                            //   add for production server
                            .WriteTo.RollingFile(AppDomain.CurrentDomain.BaseDirectory + "logs/log{Date}.txt",
                                outputTemplate: "{Timestamp:HH:mm:ss} {Message:lj}{NewLine}",
                                shared: true)
                            .Enrich.WithProperty("ApplicationName", typeof(Program).Assembly.GetName().Name)
                            .Enrich.WithProperty("Environment", hostingContext.HostingEnvironment);
                    });
                });
    }
}
