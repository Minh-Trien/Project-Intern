
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shopping.ManagerProduct.ViewModels;
using Shopping.Models.Models;

namespace Shopping.Controllers
{
    [Route("api/task")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly Shopping912Context _context;

        public TaskController(Shopping912Context context)
        {
            _context = context;
        }
        [HttpGet()]
        public async Task<ActionResult<PaginationViewModels>> GetTask(
            [FromQuery] int page = 1, // Trang mặc định là trang 1
            [FromQuery] int pageSize = 10
             ) // Số lượng mục trên mỗi trang mặc định là 10
        {
            // Tính toán vị trí bắt đầu của mục trong cơ sở dữ liệu dựa trên trang và số lượng mục trên mỗi trang
            int skip = (page - 1) * pageSize;
            var totalItems = await _context.Products.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
            var Task = await _context.Tasks
                .Skip(skip) // Bỏ qua các mục trước trang hiện tại
                .Take(pageSize) // Chọn số lượng mục cho trang hiện tại
                .ToListAsync();
            
            var paginationInfo = new PaginationViewModels
            {
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Data = Task
            };

            return paginationInfo;
        }

    }
}
