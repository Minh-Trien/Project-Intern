using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shopping.AppCart.Model;
using Shopping.ManagerProduct.Service;
using Shopping.ManagerToken.Service;
using Shopping.Models.Models;

namespace Shopping.AppCart.Controllers
{
    [Route("api/orderDetail")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly OrderDetailService _orderDetailService;
        private readonly OrderItemService _ordererItemService;
        private readonly TokenService _tokenService;
        public OrderDetailController(OrderDetailService orderDetailService, TokenService tokenService, OrderItemService ordererItemService)
        {

            _orderDetailService = orderDetailService;
            _tokenService = tokenService;
            _ordererItemService = ordererItemService;
        }
        [Authorize(Roles = "user")]
        [HttpPost]
        public async Task<ActionResult<OrderDetailModel>> PostOrderDetail([FromBody] OrderDetailModel orderDetail)
        {
            string token = Request.Headers["Authorization"];

            if(token != null) {
                var userId =  _tokenService.ExtractUserIdFromToken(token);
                if (userId == null || !int.TryParse(userId, out int userIdInt))
                {
                    // Xử lý trường hợp không tìm thấy giá trị "id" hoặc không thể chuyển đổi thành int
                    return BadRequest("Invalid or missing user ID in the token");
                }
                OrderDetail orderDetailAdd = new OrderDetail();
                orderDetailAdd.UserId = userIdInt;
                orderDetailAdd.Total = orderDetail.Total;     
                await _orderDetailService.InsertAsync(orderDetailAdd);

                return Ok(orderDetailAdd);
            }
            return BadRequest();

        }
        [Authorize(Roles = "user")]
        [HttpPost("orderItems")]
        public async Task<ActionResult<OrderItemsModel>> PostOrderItem([FromBody] OrderItemsModel orderItemModel)
        {
            string token = Request.Headers["Authorization"];

            if (token != null)
            {
                
                var exitOrderItems =  _ordererItemService.GetByProductID(orderItemModel.ProductId);
                if(exitOrderItems != null && exitOrderItems.OrderId == orderItemModel.OrderId)
                {
                    exitOrderItems.Quantity += orderItemModel.Quantity;
                    await _ordererItemService.UpdateAsync(orderItemModel.ProductId,exitOrderItems);
                    return Ok(exitOrderItems);
                }
                else {
                    OrderItem orderItem = new OrderItem();
                    orderItem.OrderId = orderItemModel.OrderId;
                    orderItem.ProductId = orderItemModel.ProductId;   
                    orderItem.Quantity = orderItemModel.Quantity;
                    await _ordererItemService.InsertAsync(orderItem);
                    return Ok(orderItem);
                }
            }
            return BadRequest();

        }

    }
}
