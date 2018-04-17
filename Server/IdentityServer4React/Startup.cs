namespace IdentityServer4React
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using IdentityServer4;
    using IdentityServer4.Configuration;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authentication.Cookies;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.DependencyInjection;

    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddMvc();

            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddInMemoryClients(Config.GetClients())
                .AddTestUsers(Config.GetUsers());

            services
                .AddAuthentication("idp")
                .AddCookie("idp", options =>
                {
                    options.EventsType = typeof(CustomCookieAuthenticationEvents);                    
                });

            services.AddScoped<CustomCookieAuthenticationEvents>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // TODO: white list CORS
            app.UseCors(builder =>
                builder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
            );

            app.UseDefaultFiles(new DefaultFilesOptions
            {
                DefaultFileNames = new List<string> { "index.html" },
            });

            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapRoute(
                    name: "catch-all",
                    template: "{*url}",
                    defaults: new { controller = "Default", action = "Index" }
                );
            });
        }
    }

    public class CustomCookieAuthenticationEvents : CookieAuthenticationEvents
    {
        
        public override Task ValidatePrincipal(CookieValidatePrincipalContext context)
        {
            //var userPrincipal = context.Principal;

            //// Look for the LastChanged claim.
            //var lastChanged = (from c in userPrincipal.Claims
            //    where c.Type == "LastChanged"
            //    select c.Value).FirstOrDefault();

            //if (string.IsNullOrEmpty(lastChanged) ||
            //    !_userRepository.ValidateLastChanged(lastChanged))
            //{
            //    context.RejectPrincipal();

            //    await context.HttpContext.SignOutAsync(
            //        CookieAuthenticationDefaults.AuthenticationScheme);
            //}

            // TODO: check authentication level claim
            //var authenticationLevel = context.Principal.Claims.FirstOrDefault(c => c.Type == "authenticationLevel");
            //return authenticationLevel == null ? Task.FromResult(null) : base.ValidatePrincipal(context);

            // If we want a second cookie for authentication level, then you could read it here and add to the claims (or reject principal)
            context.Principal.Claims.Append(new Claim("baz", "bar"));
            return base.ValidatePrincipal(context);
        }

        public override Task SigningIn(CookieSigningInContext context)
        {
            // if you want a separate cookie for authentication level, you can set it here
            var options = new CookieOptions
            {
                Domain = context.CookieOptions.Domain,
                Path = context.CookieOptions.Path,
                HttpOnly = true,
            };

            // context.Response.Cookies.Append("foo", "bar", options);

            // don't believe the following works, if you want to add claims to the IS cookie, then you can pass 
            // additional claims in the SignInAsync call
            context.Principal.Claims.Append(new Claim("authenticationLevel", "bar"));

            return base.SigningIn(context);
        }

        public override Task SignedIn(CookieSignedInContext context)
        {
            // context.Principal.Claims.Append(new Claim("foo", "bar"));
            return base.SignedIn(context);
        }
    }
}