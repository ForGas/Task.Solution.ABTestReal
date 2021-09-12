using Serilog;
using FluentValidation;
using Task_WebSolution.Context;
using Task_WebSolution.Services;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Task_WebSolution.Context.Validators;
using Task_WebSolution.Context.Repositories;
using Task_WebSolution.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

namespace Task_WebSolution
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            string connection = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<ApplicationDbContext>(option =>
                option.UseSqlServer(connection));

            services.AddScoped(x =>
                new UserRepository(
                    x.GetService<ApplicationDbContext>()));

            services.AddScoped<IFileService<TextFormat>>(x =>
                new ProjectDirectoryService());

            services
                .AddMvc()
                .AddFluentValidation(fv =>
                {
                    fv.RegisterValidatorsFromAssemblyContaining<Startup>();
                    fv.ImplicitlyValidateRootCollectionElements = true;
                });


            services.AddValidatorsFromAssemblyContaining<UserDtoValidator>(ServiceLifetime.Scoped);

            services.AddAutoMapper(typeof(Startup));

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseSerilogRequestLogging();


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
