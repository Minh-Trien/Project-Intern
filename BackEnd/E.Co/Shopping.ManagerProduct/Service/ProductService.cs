
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Shopping.ManagerProduct.Repository;
using Shopping.ManagerProduct.ViewModels;
using Shopping.Models.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Shopping.ManagerProduct.Services
{
    public class ProductService
    {
        private readonly ProductRepository _productRepository;
        public ProductService(ProductRepository productRepository) {

            _productRepository = productRepository;
        }
        public async Task<PaginationViewModels> GetProductPaging(int page, int pageSize)
        {
            var totalItems = await _productRepository.GetCounts();
            var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
            var products = await _productRepository.GetPaging(page, pageSize);
            var paginationInfo = new PaginationViewModels
            {
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Data = products
            };
            return paginationInfo;
        }

        public async Task<Product> GetId(int id)
        {
            return await _productRepository.GetIdAsync(id);
        }

        public async System.Threading.Tasks.Task AddNew(Product product)
        {
            await _productRepository.InsertAsync(product);
        }

        public async Task<Product> Update(int id, Product product)
        {
         return   await _productRepository.UpdateIdAsync(id, product);
        }
        public async Task<PaginationViewModels> Sort(string sortBy, string sortOrder, int page, int pageSize)
        {
            var totalItems = await _productRepository.GetCounts();
            var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
            var products = await _productRepository.Sorting(sortBy, sortOrder, page, pageSize);
            var paginationInfo = new PaginationViewModels
            {
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Data = products
            };
            return paginationInfo;
        }
        public async Task<PaginationViewModels> Search(string keyword, int page, int pageSize)
        {
            var products = await _productRepository.Searching(keyword, page, pageSize);
            var totalItems = products.Count();
            var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
            var paginationInfo = new PaginationViewModels
            {
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Data = products
            };
            return paginationInfo;
        }
        public async Task<PaginationViewModels> GetProductByTaskId(int id, int page, int pageSize)
        {
            var products = await _productRepository.GetProductsByTaskId(id, page, pageSize);
            var totalItems = await _productRepository.totalItemByTaskId(id);
            var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
            var paginationInfo = new PaginationViewModels
            {
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Data = products
            };
            return paginationInfo;
        }

        public async Task<PaginationViewModels> GetSearchNoHidden(string keyword, int page, int pageSize)
        {
            var products = await _productRepository.SearchNoHidden(keyword, page, pageSize);
            var totalItems = await _productRepository.totalItemSearch(keyword);
            var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
            var paginationInfo = new PaginationViewModels
            {
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Data = products
            };
            return paginationInfo;
        }
        public async Task<PaginationViewModels> GetProductNoHidden( int page, int pageSize)
        {
            var products = await _productRepository.GetProductNoHidden( page, pageSize);
            var totalItems = await _productRepository.totalItemNoHidden();
            var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
            var paginationInfo = new PaginationViewModels
            {
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Data = products
            };
            return paginationInfo;
        }

        public async Task<Product> HiddenProduct(int productId)
        {
            var product = await _productRepository.GetIdAsync(productId);

            if (product == null)
            {
                return null;  
            }
           
            product.Hidden = !product.Hidden;
           
         return   await _productRepository.UpdateIdAsync(productId, product);
        }


    }
}
