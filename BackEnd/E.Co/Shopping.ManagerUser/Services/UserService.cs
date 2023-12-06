
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.VisualBasic;
using Shopping.ManagerUser.Repository;
using Shopping.ManagerUser.ViewModels;
using Shopping.Models.Models;

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerUser.Services
{
    public class UserService
    {
        private readonly UserRepository _UserRepository;
        private readonly Shopping912Context _db;
        public UserService(UserRepository UserRepository, Shopping912Context db)
        {

            _UserRepository = UserRepository;
            _db = db;
        }
        public async Task<PaginationViewModels> GetUserPaging(int page, int pageSize)
        {
            var totalItems = await _UserRepository.GetCounts();
            var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
            var Users = await _UserRepository.GetPaging(page, pageSize);

            var paginationInfo = new PaginationViewModels
            {
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Data = Users
            };
            return paginationInfo;
        }

        public async Task<User> GetId(int id)
        {
            return await _UserRepository.GetIdAsync(id);
        }

        public async System.Threading.Tasks.Task AddNew(User User)
        {
            await _UserRepository.InsertAsync(User);
        }

        public async Task<int> GetUserIdByEmail ( string email)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user != null)
            {
                // User found, do something with it
                int id = user.Id;
                return id;
            }
            else
            {
                // User not found
                return 0;
            }
        }

        public async Task<User> Update(int id, User User)
        {
            return await _UserRepository.UpdateIdAsync(id, User);
        }
        public async Task<PaginationViewModels> Sort(string sortBy, string sortOrder, int page, int pageSize)
        {

            var totalItems = await _UserRepository.GetCounts();
            var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
            var Users = await _UserRepository.Sorting(sortBy, sortOrder, page, pageSize);
            var paginationInfo = new PaginationViewModels
            {
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Data = Users
            };
            return paginationInfo;
        }
        public async Task<PaginationViewModels> Search(string keyword, int page, int pageSize)
        {
            var Users = await _UserRepository.Searching(keyword, page, pageSize);
            var totalItems = Users.Count();
            var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
            var paginationInfo = new PaginationViewModels
            {
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Data = Users
            };
            return paginationInfo;
        }

    }
}
