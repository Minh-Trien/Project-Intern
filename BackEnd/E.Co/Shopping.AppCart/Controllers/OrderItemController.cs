using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shopping.ManagerProduct.Repository;
using Shopping.ManagerProduct.Service;
using Shopping.ManagerProduct.Services;
using Shopping.Models.Models;

namespace Shopping.AppCart.Controllers
{
    [Route("api/orderItem")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly OrderItemService _orderItemService;
        public OrderItemController(OrderItemService orderItemService) { 
        _orderItemService = orderItemService;
        }
        [HttpPost]
        public async Task<ActionResult<OrderItem>> PostProduct([FromBody] OrderItem orderItem)
        {
            if (orderItem == null)
            {
                return BadRequest("List Product Null");
            }
            else
            {
                await _orderItemService.InsertAsync(orderItem);
                return Ok(orderItem);
            }
        }

    }
}
