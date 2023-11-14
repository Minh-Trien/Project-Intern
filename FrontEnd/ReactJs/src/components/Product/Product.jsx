import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchAllTask } from '../../Service/productService';
import ReactPaginate from 'react-paginate';
import { debounce } from "lodash";
import {  fetchProducts, featchByTaskId, searchProduct, addToCart , updateCart, fetchSingleProduct} from '../../redux/product/productAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Product() {
  const cartItems = useSelector(state => state.cart.cartItems);
  const navigate = useNavigate();
  const totalPage = useSelector(state => state.cart.totalPages);
  const products = useSelector(state => state.cart.products)
  const [task, setTask] = useState([]);
  const [taskId, setTaskId] = useState();
  const [page, setPage] = useState(1);
  const [productOrTask, setProductOrTask] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(Date()) ;
  const timestamp = new Date(currentDateTime).getTime();
  const [randomInt, setRandomInt] = useState(0);
  const auth = useSelector(state => state.user.account.auth);
  const generateRandomInt = () => {
    const min = 1;
    const max = 100;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomInt(randomInt);
  };
  const dispatch = useDispatch();
  
  useEffect(() => {
    HandleFetchAllProducts(page);
    getTasks()
    generateRandomInt()
  }, []);

  const getTasks = async () => {
    let res = await fetchAllTask();
    if (res && res.data) {
      setTask(res.data.data.$values)
    }
  }

  const HandleFetchAllProducts = async (page) => {
    setProductOrTask(true);
    dispatch(fetchProducts(page));
  }

  const handlePageClick = (event) => {
    if (productOrTask) {
      HandleFetchAllProducts(+event.selected + 1)
    } else {
      handleTask(taskId, +event.selected + 1)
    }
    setPage(+event.selected + 1);
  }

  const handleTask = async (id, page) => {
    dispatch(featchByTaskId(id, page))
    setTaskId(id);
    setProductOrTask(false);
  }

  const handleSingleProduct = async (id) => {
    dispatch(fetchSingleProduct(id));
    navigate('/detailProduct');
  }

  const handleAddToCart = async (sessionId,productId,quantity) => {
    if (auth) {
      console.log(cartItems)
      // Kiểm tra nếu productId tồn tại trong cartItems
      const existingCartItem = cartItems.find(item => item.productId == productId);
      if (existingCartItem) {
        existingCartItem.quantity ++; 
        console.log(existingCartItem);
        // Sử dụng hàm updateCart khi sản phẩm đã tồn tại trong giỏ hàng
       dispatch(updateCart(existingCartItem.id,existingCartItem.quantity));
      // let res = await updateCarts(existingCartItem.id,existingCartItem.quantity);
       console.log("update")            
      // console.log(res)
      toast("Add To Cart Succeed!");
      } else {
        // Sử dụng hàm addToCart khi sản phẩm chưa tồn tại trong giỏ hàng
        dispatch(addToCart(sessionId,productId, quantity));
        console.log("add to cart")
        toast("Add To Cart Succeed!");
      }
    } else {
      toast.error("You must log in to add to the cart!");
    }
  };
  
  const handleSearch = debounce(async (sr) => {
    let term = sr.target.value;
    if (term) {
      dispatch(searchProduct(term));
    } else {
      HandleFetchAllProducts(1);
    }
  }, 1000)

  return (
    <div className="product">
      <div className="album py-5 bg-light">
        <div className="">
          <div className='row'>
            <div className='col-md-3'>
              <div className="dropdown my-2 ml-5">
                <a className=" categories btn  dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  {task && task.length > 0 && task.map((item, index) => (
                    <li key={index} onClick={() => handleTask(item.id, page)}><a className="dropdown-item" >{item.name}</a></li>
                  ))}
                  <li onClick={() => HandleFetchAllProducts(page)}><a className="dropdown-item" >All</a></li>
                </ul>
              </div>
            </div>
            <div className='col-md-8'>
              <div className='my-3 mb-5 '>
                <input
                  type='text'
                  className='form-control input-search'
                  placeholder='Search.......'
                  onChange={(sr) => handleSearch(sr)} />
              </div>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 ">
                {products && products.length > 0 && products
                  .map((item, index) => (
                  <div className="col" key={item.id}>
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
                                onClick={() => handleSingleProduct(item.id)}
                              >
                                View
                              </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleAddToCart(1,item.id, 1)}
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
      </div>



    </div>
  );
}

export default Product;
