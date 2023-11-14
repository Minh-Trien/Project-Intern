
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Shopping.ManagerUser.Services;
using Shopping.ManagerUser.ViewModels;
using Shopping.Models.Models;

namespace Shopping.AppUser.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;
        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet()]
        public async Task<ActionResult<PaginationViewModels>> GetUser(
            [FromQuery] int page = 1, // Trang mặc định là trang 1
            [FromQuery] int pageSize = 10) // Số lượng mục trên mỗi trang mặc định là 10
        {
            return await _userService.GetUserPaging(page, pageSize);

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserByID(int id)
        {
            return await _userService.GetId(id);
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("List user Null");
            }
            else
            {
                await _userService.AddNew(user);
                return Ok(user);
            }
        }

        // PUT api/users/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> PutUser(int id, [FromBody] User user)
        {

            if (id != user.Id)
            {
                ModelState.AddModelError("Id", "Invalid Id");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return await _userService.Update(id, user);

        }

        /*        // PUT api/User/{id}/hidden
                [HttpPut("{id}/hidden")]
                public async Task<IActionResult> UpdateUserHidden(int id)
                {
                    var User = await _GetUserByIdAsync(id);

                    if (User == null)
                    {
                        return NotFound(); // Trả về HTTP 404 Not Found nếu không tìm thấy sản phẩm
                    }

                    // Cập nhật giá trị 'hidden' của sản phẩm
                    User.Hidden = !User.Hidden;
                    // Lưu thay đổi vào cơ sở dữ liệu
                    _context.Entry(User).State = EntityState.Modified;

                    try
                    {
                        await _context.SaveChangesAsync();
                        return Ok(); // Trả về HTTP 200 OK sau khi cập nhật thành công
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!UserService.Instance.UserExists(id))
                        {
                            return NotFound(); // Trả về HTTP 404 Not Found nếu không tìm thấy sản phẩm
                        }
                        else
                        {
                            throw;
                        }
                    }
                }*/
        //api/user/sort
        [HttpGet("sort")]
        public async Task<ActionResult<PaginationViewModels>> SortUsers(
        [FromQuery] string sortBy, // Tên trường cần sắp xếp
        [FromQuery] string sortOrder, // Thứ tự sắp xếp (asc hoặc desc)
        [FromQuery] int page = 1, // Trang mặc định là trang 1
        [FromQuery] int pageSize = 10) // Số lượng mục trên mỗi trang mặc định là 10
        {
            return await _userService.Sort(sortBy, sortOrder, page, pageSize);
        }

        [HttpGet("search")]
        public async Task<ActionResult<PaginationViewModels>> GetSearch(
        [FromQuery] string keyword,
        [FromQuery] int page = 1, // Trang mặc định là trang 1
        [FromQuery] int pageSize = 10)
        {
            return await _userService.Search(keyword, page, pageSize);
        }

       




        /*
                [HttpPost("import")]
                public async Task<IActionResult> ImportFile(IFormFile file)
                {
                    try
                    {
                        if (file == null || file.Length <= 0)
                        {
                            return BadRequest("Vui lòng chọn tệp Excel để import.");
                        }

                        using (var package = new ExcelPackage(file.OpenReadStream()))
                        {
                            var worksheet = package.Workbook.Worksheets[0]; // Lấy trang tính toán đầu tiên

                            var UserList = new List<User>(); // Danh sách sản phẩm để lưu dữ liệu từ Excel

                            for (int row = 2; row <= worksheet.Dimension.End.Row; row++) // Bắt đầu từ hàng thứ 2 (do hàng đầu tiên là tiêu đề)
                            {
                                var User = new User
                                {
                                    Name = worksheet.Cells[row, 1].Value.ToString(), // Đọc dữ liệu từ cột 1
                                    Descriptions = worksheet.Cells[row, 1].Value.ToString(),                                   // Đọc các cột khác và gán giá trị cho thuộc tính của User
                                                                                                                                  // Ví dụ: User.TaskId = worksheet.Cells[row, 2].Value.ToString()                                                                                       // Tiếp tục cho các cột còn lại
                                };

                                UserList.Add(User);
                            }

                            // Lưu danh sách sản phẩm vào cơ sở dữ liệu
                            _context.Users.AddRange(UserList);
                            await _context.SaveChangesAsync();

                            return Ok("Import thành công.");
                        }
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, "Lỗi trong quá trình import: " + ex.Message);
                    }
                }
                [HttpGet("export")]
                public async Task<IActionResult> ExportFile()
                {
                    try
                    {
                        var UserList = await _context.Users.ToListAsync(); // Lấy danh sách sản phẩm từ cơ sở dữ liệu

                        if (UserList == null || UserList.Count == 0)
                        {
                            return BadRequest("Không có dữ liệu để xuất.");
                        }

                        using (var package = new ExcelPackage())
                        {
                            var worksheet = package.Workbook.Worksheets.Add("Danh sách sản phẩm"); // Tạo một trang tính mới

                            // Thêm tiêu đề cho các cột
                            worksheet.Cells[1, 1].Value = "name";
                            worksheet.Cells[1, 2].Value = "description";
                            worksheet.Cells[1, 3].Value = "price";
                            worksheet.Cells[1, 4].Value = "image";
                            worksheet.Cells[1, 5].Value = "hidden";
                            worksheet.Cells[1, 6].Value = "taskId";
                            worksheet.Cells[1, 7].Value = "Quanlity";
                            // Thêm tiêu đề cho các cột khác (nếu cần)

                            int row = 2; // Bắt đầu từ hàng thứ 2 để điền dữ liệu
                            foreach (var User in UserList)
                            {
                                worksheet.Cells[row, 1].Value = User.Name; // Điền dữ liệu vào cột 1
                                worksheet.Cells[row, 2].Value = User.Descriptions;
                                worksheet.Cells[row, 3].Value = User.Price;
                                worksheet.Cells[row, 4].Value = User.Image;
                                worksheet.Cells[row, 5].Value = User.Hidden;
                                worksheet.Cells[row, 6].Value = User.TaskId;
                                worksheet.Cells[row, 7].Value = User.Quanlity;
                                row++;
                            }

                            // Lưu tệp Excel vào MemoryStream
                            var memoryStream = new MemoryStream();
                            package.SaveAs(memoryStream);
                            memoryStream.Position = 0;

                            // Trả về tệp Excel dưới dạng FileResult
                            var fileName = $"DanhSachSanPham_{DateTime.Now:yyyyMMddHHmmss}.xlsx";
                            return File(memoryStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
                        }
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, "Lỗi trong quá trình xuất dữ liệu: " + ex.Message);
                    }
                }


            */
    }




}

