import React, { useEffect } from 'react';
import '../assets/productDetail.css';
import '../assets/responsive.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addToCart, updateCart,fetchSingleProduct } from '../../redux/product/productAction';
import { toast } from 'react-toastify';
const ProductDetail = () => {

  const product = useSelector(state => state.cart.singleProduct)
  const cartItems = useSelector(state => state.cart.cartItems);
  const auth = useSelector(state => state.user.account.auth);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  console.log(quantity)

  const handleAddToCart = async (sessionId, productId, quantity) => {
    if (auth) {
      console.log(cartItems)
      // Kiểm tra nếu productId tồn tại trong cartItems
      const existingCartItem = cartItems.find(item => item.productId == productId);
      if (existingCartItem) {

        // Sử dụng hàm updateCart khi sản phẩm đã tồn tại trong giỏ hàng
        dispatch(updateCart(existingCartItem.id, quantity + existingCartItem.quantity));
        // let res = await updateCarts(existingCartItem.id,existingCartItem.quantity);
        console.log("update")
        toast("Add To Cart Succeed!");
        // console.log(res)
      } else {
        // Sử dụng hàm addToCart khi sản phẩm chưa tồn tại trong giỏ hàng
        dispatch(addToCart(sessionId, productId, quantity));
        console.log("add to cart")
        toast("Add To Cart Succeed!");
      }
    } else {
      toast.error("You must log in to add to the cart!");
    }
  };
 
  const handlePlus = () => {
    setQuantity(quantity + 1);
  }

  const handleMinus = () => {
    setQuantity(quantity - 1);
  }
  return (
    <div className="container single_product_container">
      <div className="breadcrumbs d-flex flex-row align-items-center">
        <ul>
          <li>
            <NavLink className="nav-link" to='/' >Home</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to='/product' >
              <i className="fa fa-angle-right" aria-hidden="true"></i>Product
            </NavLink>
          </li>
          <li className="active">
            <NavLink className="nav-link"  >
              <i className="fa fa-angle-right" aria-hidden="true"></i>Product Details
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='single_product_body'>
        <div className="row">
          <div className="col">
          </div>
        </div>

        <div className="row">
          <div className="col-lg-7">
            <div className="single_product_pics ">
              <div className="row">
                <div className="col-lg-1 thumbnails_col order-lg-1 order-2">
                </div>
                <div className="col-lg-10 image_col order-lg-2 order-1">
                  <div className="single_product_image">
                    <div
                      className="single_product_image_background"
                      style={{
                        backgroundImage: `url(${product.image
                          })`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 ">
            <div className="product_details">
              <div className="product_details_title">
                <h2> {product.name} </h2>
                <p> {product.descriptions}</p>
              </div>
              <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
                <span>
                  <i className="fas fa-truck"></i>
                </span>
                <span>free delivery</span>
              </div>
              <div className="original_price">
                {" "}
                 {(parseFloat(product.price) + 30)} $
              </div>
              <div className="product_price">
                {product.price} $
              </div>
              <ul className="star_rating">
                <li>
                  <i className="fa fa-star" aria-hidden="true"></i>
                </li>
                <li>
                  <i className="fa fa-star" aria-hidden="true"></i>
                </li>
                <li>
                  <i className="fa fa-star" aria-hidden="true"></i>
                </li>
                <li>
                  <i className="fa fa-star" aria-hidden="true"></i>
                </li>
                <li>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </li>
              </ul>
              <div className="product_color">
                <span>Select Color:</span>
                <ul>
                  <li style={{ background: "#e54e5d" }}></li>
                  <li style={{ background: "#252525" }}></li>
                  <li style={{ background: "#60b3f3" }}></li>
                </ul>
              </div>
              <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                <span>Quantity:</span>

                <div className="quantity_selector">
                  <span
                    className={
                      quantity > 1 ? "minus" : "minus disabled"
                    }
                    onClick={() => handleMinus()}
                  >
                    <i className="fa fa-minus" aria-hidden="true"></i>
                  </span>
                  <span id="quantity_value">{quantity}</span>
                  <span
                    className="plus"
                    onClick={() => handlePlus()}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </span>
                </div>
                <div
                  className="red_button product-add_to_cart_button"
                  onClick={() => handleAddToCart(1, product.id, quantity)}
                >
                  <a href="#">add to cart</a>
                </div>



                <div className="product_favorite d-flex flex-column align-items-center justify-content-center">
                  <i className="far fa-heart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetail;