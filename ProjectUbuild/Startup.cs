using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ProjectUbuild.Startup))]
namespace ProjectUbuild
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
