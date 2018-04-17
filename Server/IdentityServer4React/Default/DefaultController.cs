namespace IdentityServer4React.Default
{
    using System;
    using System.IO;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Net.Http.Headers;

    public class DefaultController : Controller
    {
        private readonly IHostingEnvironment environment;

        public DefaultController(IHostingEnvironment environment)
        {
            this.environment = environment ?? throw new ArgumentNullException(nameof(environment));
        }

        [HttpGet]
        public IActionResult Index()
        {
            return new PhysicalFileResult(
                Path.Combine(this.environment.WebRootPath, "index.html"),
                new MediaTypeHeaderValue("text/html")
            );
        }
    }
}
