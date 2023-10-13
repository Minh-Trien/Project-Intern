using BLL.Services;
using DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Shopping.ViewModels;
namespace Shopping.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productService;
        public ProductsController(ProductService productService)
        {
            _productService = productService;         
        }

        [HttpGet()]
        public async Task<ActionResult<PaginationViewModels>> GetProduct(
            [FromQuery] int page = 1, // Trang mặc định là trang 1
            [FromQuery] int pageSize = 10) // Số lượng mục trên mỗi trang mặc định là 10
        {
         return await _productService.GetProductPaging(page, pageSize);

        }
        
        [HttpGet("NoHidden")]
        public async Task<ActionResult<PaginationViewModels>> GetProductNoHidden(
            [FromQuery] int page = 1, // Trang mặc định là trang 1
            [FromQuery] int pageSize = 6) // Số lượng mục trên mỗi trang mặc định là 10
        {


            return await _productService.GetProductNoHidden(page, pageSize);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductByID(int id)
        {
            return await _productService.GetId(id);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromBody] Product product)
        {
            if(product == null)
            {
                 return BadRequest("List Product Null");
            }
            else { 
                await _productService.AddNew(product);
                return Ok(product);
            }      
        }

        // PUT api/products/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> PutProduct(int id, [FromBody] Product Product)
        {

            if (id != Product.Id)
            {
                ModelState.AddModelError("Id", "Invalid Id");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
                return  await _productService.Update(id, Product);
   
        }

        /*        // PUT api/product/{id}/hidden
                [HttpPut("{id}/hidden")]
                public async Task<IActionResult> UpdateProductHidden(int id)
                {
                    var product = await _GetProductByIdAsync(id);

                    if (product == null)
                    {
                        return NotFound(); // Trả về HTTP 404 Not Found nếu không tìm thấy sản phẩm
                    }

                    // Cập nhật giá trị 'hidden' của sản phẩm
                    product.Hidden = !product.Hidden;
                    // Lưu thay đổi vào cơ sở dữ liệu
                    _context.Entry(product).State = EntityState.Modified;

                    try
                    {
                        await _context.SaveChangesAsync();
                        return Ok(); // Trả về HTTP 200 OK sau khi cập nhật thành công
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!ProductService.Instance.ProductExists(id))
                        {
                            return NotFound(); // Trả về HTTP 404 Not Found nếu không tìm thấy sản phẩm
                        }
                        else
                        {
                            throw;
                        }
                    }
                }*/
        //api/product/sort
        [HttpGet("sort")]
        public async Task<ActionResult<PaginationViewModels>> SortProducts(
        [FromQuery] string sortBy, // Tên trường cần sắp xếp
        [FromQuery] string sortOrder, // Thứ tự sắp xếp (asc hoặc desc)
        [FromQuery] int page = 1, // Trang mặc định là trang 1
        [FromQuery] int pageSize = 10) // Số lượng mục trên mỗi trang mặc định là 10
        {
           return await _productService.Sort(sortBy, sortOrder, page, pageSize);
        }

        [HttpGet("search")]
        public async Task<ActionResult<PaginationViewModels>> GetSearch(
        [FromQuery] string keyword,
        [FromQuery] int page = 1, // Trang mặc định là trang 1
        [FromQuery] int pageSize = 10)
        {
           return await _productService.Search(keyword, page, pageSize);
        }

        [HttpGet("searchNoHidden")]
        public async Task<ActionResult<PaginationViewModels>> GetSearchNoHidden(
        [FromQuery] string keyword,
        [FromQuery] int page = 1, // Trang mặc định là trang 1
        [FromQuery] int pageSize = 6)
        {
          return  await _productService.GetSearchNoHidden(keyword, page, pageSize);
        }

        [HttpGet("task")]
        public async Task<ActionResult<PaginationViewModels>> GetProductByTaskId(
            int id,
            [FromQuery] int page = 1, // Trang mặc định là trang 1
            [FromQuery] int pageSize = 6 ) // Số lượng mục trên mỗi trang mặc định là 10
        {
           return await _productService.GetProductByTaskId(id, page, pageSize);
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

                            var productList = new List<Product>(); // Danh sách sản phẩm để lưu dữ liệu từ Excel

                            for (int row = 2; row <= worksheet.Dimension.End.Row; row++) // Bắt đầu từ hàng thứ 2 (do hàng đầu tiên là tiêu đề)
                            {
                                var product = new Product
                                {
                                    Name = worksheet.Cells[row, 1].Value.ToString(), // Đọc dữ liệu từ cột 1
                                    Descriptions = worksheet.Cells[row, 1].Value.ToString(),                                   // Đọc các cột khác và gán giá trị cho thuộc tính của product
                                                                                                                                  // Ví dụ: product.TaskId = worksheet.Cells[row, 2].Value.ToString()                                                                                       // Tiếp tục cho các cột còn lại
                                };

                                productList.Add(product);
                            }

                            // Lưu danh sách sản phẩm vào cơ sở dữ liệu
                            _context.Products.AddRange(productList);
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
                        var productList = await _context.Products.ToListAsync(); // Lấy danh sách sản phẩm từ cơ sở dữ liệu

                        if (productList == null || productList.Count == 0)
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
                            foreach (var product in productList)
                            {
                                worksheet.Cells[row, 1].Value = product.Name; // Điền dữ liệu vào cột 1
                                worksheet.Cells[row, 2].Value = product.Descriptions;
                                worksheet.Cells[row, 3].Value = product.Price;
                                worksheet.Cells[row, 4].Value = product.Image;
                                worksheet.Cells[row, 5].Value = product.Hidden;
                                worksheet.Cells[row, 6].Value = product.TaskId;
                                worksheet.Cells[row, 7].Value = product.Quanlity;
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

