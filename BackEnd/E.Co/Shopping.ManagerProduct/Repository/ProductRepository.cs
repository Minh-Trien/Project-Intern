
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Shopping.Common.Repository;
using Shopping.Models.Models;

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerProduct.Repository
{
    public class ProductRepository : BaseRepository<Product, string>
    {
        public ProductRepository(Shopping912Context db) : base(db)
        {
        }

        public async Task<IEnumerable<Product>> GetPaging(int page, int pageSize)
        {
            int skip = (page - 1) * pageSize;
            return await _db.Products
            .Skip(skip) // Bỏ qua các mục trước trang hiện tại
            .Take(pageSize) // Chọn số lượng mục cho trang hiện tại
            .ToListAsync();
        }
        public async Task<int> GetCounts()
        {
            return await _db.Products.CountAsync();
        }
        public async Task<IEnumerable<Product>> GetProductNoHidden(int page, int pageSize)
        {
            int skip = (page - 1) * pageSize;
            return await _db.Products
                .Where(p => p.Hidden == true).Skip(skip) // Bỏ qua các mục trước trang hiện tại
                .Take(pageSize).ToListAsync();
        }

        public async Task<IEnumerable<Product>> Sorting(string sortBy, string sortOrder,  int page, int pageSize)
        {
            // Kiểm tra thứ tự sắp xếp và tạo biến bool để xác định sắp xếp tăng dần (asc) hay giảm dần (desc)
            bool isAscending = string.Equals(sortOrder, "asc", StringComparison.OrdinalIgnoreCase);

            // Tính toán vị trí bắt đầu của mục trong cơ sở dữ liệu dựa trên trang và số lượng mục trên mỗi trang
            int skip = (page - 1) * pageSize;

            // Sử dụng Entity Framework để lấy danh sách sản phẩm và sắp xếp chúng theo trường và thứ tự được chỉ định
            var query =  _db.Products.AsQueryable();

            switch (sortBy.ToLower())
            {
                case "id":
                    query = isAscending ? query.OrderBy(p => p.Id) : query.OrderByDescending(p => p.Id);
                    break;
                case "name":
                    query = isAscending ? query.OrderBy(p => p.Name) : query.OrderByDescending(p => p.Name);
                    break;
            }
            var products = await query
                .Skip(skip) // Bỏ qua các mục trước trang hiện tại
                .Take(pageSize) // Chọn số lượng mục cho trang hiện tại
                .ToListAsync();
            return products;
        }
        public async Task<IEnumerable<Product>> Searching(string keyword, int page, int pageSize)
        {
            int skip = (page - 1) * pageSize;

            // Sử dụng Entity Framework để lấy danh sách sản phẩm và lọc theo từ khóa tìm kiếm bằng filter
            return await _db.Products
                .Where(p => p.Name.Contains(keyword)) // Điều kiện tìm kiếm sử dụng filter
                .Skip(skip) // Bỏ qua các mục trước trang hiện tại
                .Take(pageSize) // Chọn số lượng mục cho trang hiện tại
                .ToListAsync();
        }
        public async Task<IEnumerable<Product>> GetProductsByTaskId(int id, int page, int pageSize)
        {
            int skip = (page - 1) * pageSize;
            var products = await _db.Products
                .Where(p => p.TaskId == id && p.Hidden == true)
                .ToListAsync();
           return  products.Skip(skip)
                .Take(pageSize);
        }
        public async Task<int> totalItemByTaskId(int id)
        {
            var products = await  _db.Products
                .Where(p => p.TaskId == id && p.Hidden == true)
                .ToListAsync();
            var total = products.Count();
                
            return total;
        }
        public async Task<int> totalItemNoHidden()
        {
            var products = await _db.Products
                .Where(p =>  p.Hidden == true)
                .ToListAsync();
            var total = products.Count();
            return total;
        }

        public async Task<IEnumerable<Product>> SearchNoHidden(string keyword, int page, int pageSize)
        {
            int skip = (page - 1) * pageSize;

            // Sử dụng Entity Framework để lấy danh sách sản phẩm và lọc theo từ khóa tìm kiếm bằng filter
            var products = await _db.Products
                .Where(p => p.Name.Contains(keyword) && p.Hidden == true) // Điều kiện tìm kiếm sử dụng filter                                                                         // Chọn số lượng mục cho trang hiện tại
                .ToListAsync();
            return products.Skip(skip) // Bỏ qua các mục trước trang hiện tại
                .Take(pageSize);
        }

        public async Task<int> totalItemSearch(string keyword)
        {
            var products = await _db.Products
                .Where(p => p.Name.Contains(keyword) && p.Hidden == true) // Điều kiện tìm kiếm sử dụng filter                                                                         // Chọn số lượng mục cho trang hiện tại
                .ToListAsync();
            var total = products.Count();
            return total;
        }




    }
}
