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

namespace Shopping.ManagerUser.Repository
{
    public class UserRepository : BaseRepository<User, string>
    {
        public UserRepository(Shopping912Context db) : base(db)
        {
        }
        public async Task<IEnumerable<User>> GetPaging(int page, int pageSize)
        {
            int skip = (page - 1) * pageSize;
            return await _db.Users
            .Skip(skip) // Bỏ qua các mục trước trang hiện tại
            .Take(pageSize) // Chọn số lượng mục cho trang hiện tại
            .ToListAsync();
        }
        public async Task<int> GetCounts()
        {
            return await _db.Users.CountAsync();
        }

        public async Task<IEnumerable<User>> Sorting(string sortBy, string sortOrder, int page, int pageSize)
        {
            // Kiểm tra thứ tự sắp xếp và tạo biến bool để xác định sắp xếp tăng dần (asc) hay giảm dần (desc)
            bool isAscending = string.Equals(sortOrder, "asc", StringComparison.OrdinalIgnoreCase);

            // Tính toán vị trí bắt đầu của mục trong cơ sở dữ liệu dựa trên trang và số lượng mục trên mỗi trang
            int skip = (page - 1) * pageSize;

            // Sử dụng Entity Framework để lấy danh sách sản phẩm và sắp xếp chúng theo trường và thứ tự được chỉ định
            var query = _db.Users.AsQueryable();

            switch (sortBy.ToLower())
            {
                case "id":
                    query = isAscending ? query.OrderBy(p => p.Id) : query.OrderByDescending(p => p.Id);
                    break;
                case "email":
                    query = isAscending ? query.OrderBy(p => p.Email) : query.OrderByDescending(p => p.Email);
                    break;
            }
            var Users = await query
                .Skip(skip) // Bỏ qua các mục trước trang hiện tại
                .Take(pageSize) // Chọn số lượng mục cho trang hiện tại
                .ToListAsync();
            return Users;
        }
        public async Task<IEnumerable<User>> Searching(string keyword, int page, int pageSize)
        {
            int skip = (page - 1) * pageSize;

            // Sử dụng Entity Framework để lấy danh sách sản phẩm và lọc theo từ khóa tìm kiếm bằng filter
            return await _db.Users
                .Where(p => p.Email.Contains(keyword)) // Điều kiện tìm kiếm sử dụng filter
                .Skip(skip) // Bỏ qua các mục trước trang hiện tại
                .Take(pageSize) // Chọn số lượng mục cho trang hiện tại
                .ToListAsync();
        }




    }
}
