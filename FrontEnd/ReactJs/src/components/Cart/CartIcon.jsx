import React, { useState } from 'react';
import { useCart } from './CartContext';

function CartIcon() {
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    
    <div className="cart-container">
      <div
        className="cart-icon"
        style={{ width: "1cm", height: "1cm" }}
        onClick={toggleCart}
      >
        <li>
          <a id="cart">
            <img src="./assets/images/Cart.png" alt="Cart" />
            <i aria-hidden="true" />
          </a>
        </li>
      </div>{" "}
      {/*end navbar-right */}
      <div className={`shopping-cart ${isCartOpen ? 'open' : ''}`}>
        <div className="shopping-cart-header">
          <i className="fa fa-shopping-cart cart-icon" />
          <span className="badge" />
          <div className="shopping-cart-total">
            <span className="lighter-text"></span>
            <span className="main-color-text" />
          </div>
        </div>{" "}
        {/*end shopping-cart-header */}

        {cart.map((item) => (
          <ul className="shopping-cart-items" key={item.id}>
            <li className="clearfix">
            <img style={{ height: "1cm", width: "1cm" }} src={item.image} alt={item.name} />

          <span className="item-name col-md-3">{item.name}</span>

      <span className="item-price col-md-3">{item.price} $</span>

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
    
  );
}

export default CartIcon;
