
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shopping.ManagerProduct.Services;
using Shopping.ManagerProduct.ViewModels;
using Shopping.Models.Models;

namespace Shopping.Controllers
{
    [Route("api/carts")]
    [ApiController]
    public class CartsController : ControllerBase
    {

        private readonly CartService _cartService;
        private readonly ProductService _productService;

        public CartsController(CartService cartService, ProductService productService)
        {
            _cartService = cartService;
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<CartItem>> GetCartItem(int sessionID)
        {
            var cartItems = await _cartService.GetCartItemBySessionId(sessionID);
            return Ok(cartItems);
        }

        [HttpPost]
        public async Task<ActionResult<CartItem>> AddToCart([FromBody] CartItem cartItem)
        {
            if (cartItem == null)
            {
                return BadRequest("CartItem null");
            }
            else
            {
                await _cartService.AddNew(cartItem);
                var newcartItems = await _cartService.GetCartItemBySessionId(cartItem.SessionId);
                return Ok(newcartItems);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CartItem>> PutProduct(int id,[FromBody] CartItemUpdate cartItemUpdate)
        {
            // Kiểm tra xem đối tượng cần cập nhật có tồn tại
            var existingCartItem = await _cartService.GetCartItemById(id);
            if (existingCartItem == null)
            {
                return NotFound();
            }
            // Sao chép dữ liệu từ cartItemUpdate vào existingCartItem
            existingCartItem.Quantity = cartItemUpdate.Quantity;
            // Thực hiện cập nhật
            try
            {
                await _cartService.Update(id,existingCartItem);
                return Ok(existingCartItem);
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(StatusCodes.Status409Conflict, "The entity has been modified by another user.");
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<CartItem>> DeleteCart(int id)
        {
            if (id == null)
            {
                return NotFound();
            }
            else
            { 
             var cartDelete =  await _cartService.RemoveCartItem(id);
                return Ok(cartDelete);
            }

        }
    } 
}
