import React, { useState, useEffect } from 'react';
import { useCart } from '../Cart/CartContext';
import {  fetchAllTask, GetProductsByTaskId,getSearch } from '../../Service/ProductService';
import ReactPaginate from 'react-paginate';
import { debounce } from "lodash";
function Product() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [task, setTask] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    handleTask(1, page);
    getTasks()
  }, []);

const getTasks = async () => {
  let res = await fetchAllTask();
  if(res &&  res.data ){
    setTask(res.data.data)
  }
}
  const handlePageClick = (event) =>{
 
      handleTask(1,+event.selected + 1)
      setPage(+event.selected + 1);
  
}
const handleTask = async (id, page) => {
    let res = await GetProductsByTaskId(id, page);
    if(res && res.data){
      setProducts(res.data.data.$values);
      setTotalPage(res.data.totalPages)
      console.log(res.data.data.$values)
    }
  }
  const handleSearch = debounce( async (sr) =>
  {
    let term = sr.target.value;
    if(term){
        let response = await getSearch(term, page)  
        console.log(response)
        if (response && response.data) {
          // Cập nhật danh sách sản phẩm sau khi sắp xếp
          setProducts(response.data.data);
          setTotalPage(response.data.totalPages);
        }
    }else{
    handleTask(1)    }
  },1000)

  return (
    <div className="product-container">
        <div className="album py-5 bg-light">
          <div className="container">
          <div class="dropdown mb-3">
        <a class="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        Categories
        </a>
        <div className='mt-3 '>
        <input
        type='text'
        className='form-control'
        placeholder='Search user by name.......'     
        onChange={(sr)=> handleSearch(sr)}/>
      </div>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
  {task && task.length > 0 && task.map((item, index) => (
    <li onClick={() => handleTask(item.id, page)}><a class="dropdown-item" >{item.name}</a></li>
    ))}
  </ul>
</div>    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {products && products.length > 0 && products
                .map((item, index) => (
                  <div className="col" key={index}>
                    <div className="card shadow-sm">
                      <img src={item.image} alt="" />
                      <title>Placeholder</title>
                      <div className="card-body">
                        <p className="card-text">{item.name}</p>
                        <p className="card-text">{item.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => addToCart(item)}
                            >
                              AddToCart
                            </button>
                          </div>
                          <small className="text-muted">{item.price}.000 VNĐ</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>  
            <div className='mt-5'>
               <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName=" page-link "
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      /></div> 
          </div>
        </div>
       

       
    </div>
  );
}

export default Product;
