﻿
namespace Shopping.ManagerUser.ViewModels
{
    public class PaginationViewModels
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public IEnumerable<Object> Data  { get; set; }
    }
}
