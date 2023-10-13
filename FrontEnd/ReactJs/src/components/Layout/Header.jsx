import React from 'react';
import { NavLink } from 'react-router-dom';
import Loading from './Loading';
import CartIcon from '../Cart/CartIcon';
import '../assets/header.css'
function Header() {
  return (
    <div>
      <Loading></Loading>
      <header className="full_bg">
        <div className="header">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                <div className="full">
                  <div className="center-desk">
                    <div className="logo">
                      {/* Use NavLink for navigation */}
                      <NavLink className="nav-link" to='/'>2Rings</NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                {/* Your navigation menu */}
                {/* Add NavLink for each menu item */}
                <nav className="navigation navbar navbar-expand-md navbar-dark">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample04"
                    aria-controls="navbarsExample04"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="collapse navbar-collapse" id="navbarsExample04">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <NavLink className="nav-link" to='/'>Home</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to='/product'>Product</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to='/cart'>
                          Cart
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to='/newsFeed'>
                          NewsFeed
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to='/contact'>
                          Contact Us
                        </NavLink>
                      </li>
                      <CartIcon></CartIcon>
                      <li className="nav-item">
                        <NavLink className="nav-link" to='/Login'>
                         <button className='login-button'>Login</button> 
                        </NavLink>
                      </li>
                    </ul>
                    
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2 col-sm-8 offset-sm-2">
              <div className="play_btn text_align_center">
                {/* Your content */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
