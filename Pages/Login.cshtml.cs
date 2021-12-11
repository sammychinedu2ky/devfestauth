using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Security.Claims;

namespace DevFestAuth.Pages
{
    public class LoginModel : PageModel
    {

        public IActionResult OnGetAsync()
        {

            return Page();
        }

        public async Task<IActionResult> OnGetAuthAsync(string token, bool isNewUser, string ReturnUrl = null)
        {

            FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance
    .VerifyIdTokenAsync(token);

            var email = decodedToken.Claims["email"] as string;
            var name = decodedToken.Claims["name"] as string;
            var picture = decodedToken.Claims["picture"] as string;

            var claims = new List<Claim>
{
    new Claim(ClaimTypes.Name,email),
    new Claim("FullName", name),
    new Claim("Picture", picture),
};


            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties
            {
                RedirectUri = "/Login",
                IsPersistent = true,

            };

            await HttpContext.SignInAsync(
    CookieAuthenticationDefaults.AuthenticationScheme,
    new ClaimsPrincipal(claimsIdentity),
    authProperties);
            if (ReturnUrl != null) return Redirect(ReturnUrl);
            return Redirect("/");
        }


    }
}
