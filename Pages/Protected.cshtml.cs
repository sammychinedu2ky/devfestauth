using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DevFestAuth.Pages
{
    [Authorize]
    public class ProtectedModel : PageModel
    {

        public void OnGet()
        {
        }
    }
}
