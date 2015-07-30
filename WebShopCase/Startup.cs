using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WebShopCase.Startup))]
namespace WebShopCase
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
