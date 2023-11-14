import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CartIcon() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  let cart = useSelector(state => state.cart.cartItems)

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
  <>
  <div className='cart-container '>
      <div
        className="cart-icon"
        style={{ width: "1cm", height: "1cm" }}
        onClick={toggleCart}
      >
        <i className="fa-solid fa-cart-shopping" id='cart'></i>
      </div>

      {/*end navbar-right */}
      <div className={`shopping-cart ${isCartOpen ? 'open' : ''}`}>
        <div className="shopping-cart-header">
          
          <span className="lighter-text">Total Price: {getTotalPrice()}$</span>
          <div className="shopping-cart-total "> 
            <span className="lighter-text"> </span>
            <span className="main-color-text" />
          </div>
        </div>{" "}
        {/*end shopping-cart-header */}

        {cart.map((item) => (
          <ul className="shopping-cart-items" key={item.id}>
          <li className="clearfix">
          <img style={{ height: "1cm", width: "1cm" }} src={item.product.image} alt={item.product.name} />

          <span className="item-name col-md-3">{item.product.name}</span>

          <span className="item-price col-md-3">{item.product.price} $</span>

          <span className="item-quantity col-md-3">sl: {item.quantity}</span>
          </li>

          </ul>
        ))}

        <ul className="shopping-cart-items">
          <li className="clearfix">
            <a href="/cart" className="button">
              Checkout
            </a>
          </li>
        </ul>
      </div>
    </div>
      </>
  );
}

export default CartIcon;
