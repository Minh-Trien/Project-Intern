using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shopping.AppCart.Model;
using Shopping.ManagerProduct.Service;
using Shopping.ManagerProduct.ViewModels;
using Shopping.Models.Models;

namespace Shopping.AppCart.Controllers
{
    [Route("api/session")]
    [ApiController]
    public class ShoppingSessionController : ControllerBase
    {
        private readonly ShoppingSessionService _shoppingsessionService;
        public ShoppingSessionController(ShoppingSessionService shoppingSessionService)
        {
            _shoppingsessionService = shoppingSessionService;
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingSessionModel>> AddNewSession(int UserId)
        {
            ShoppingSession exitsShoppingSession = await _shoppingsessionService.GetByUserId(UserId);

            if (exitsShoppingSession == null)
            {
                // Initialize a new ShoppingSession instance
                exitsShoppingSession = new ShoppingSession();
                exitsShoppingSession.UserId = UserId;

                // Assuming _shoppingsessionService.AddNew handles adding the new session to the database
                await _shoppingsessionService.AddNew(exitsShoppingSession);

                return Ok(exitsShoppingSession.Id);
            }
            else
            {
                return Ok(exitsShoppingSession.Id);
            }
        }

    }
}

    

