import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from './Loading';
import CartIcon from '../Cart/CartIcon';
import '../assets/header.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../../redux/users/userAction';
import { useNavigate } from 'react-router-dom';
import { handleRefreshRedux } from '../../redux/users/userAction'
import Dropdown from 'react-bootstrap/Dropdown';
import { featchCart, fetchProducts } from '../../redux/product/productAction';
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector(state => state.user.account);

  const Logout = async () => {
    dispatch(handleLogoutRedux());
  }
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  useEffect(() => {
    if (account && account.auth === false && window.location.pathname !== '/login' &&  '/register') {
      navigate('/');
    }
  }, [account])

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.accessToken) {
      dispatch(handleRefreshRedux());
      dispatch(featchCart(1));
      dispatch(fetchProducts(1));
    }
  }, [dispatch]);
  return (
    <div>
      <Loading></Loading>
      <header className="full_bg">
        <div className="header">
          <div className="">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                <div className="full">
                  <div className="center-desk">
                    <div className="logo ml-3">
                      {/* Use NavLink for navigation */}
                      <NavLink className="nav-link" to='/'>2Rings</NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 ">
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
                  <div className="collapse navbar-collapse " id="navbarsExample04">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <NavLink className="nav-link" to='/'>Home</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to='/product'>Product</NavLink>
                      </li>


                      {account.auth ? (
                        <li className="nav-item">
                          <NavLink className="nav-link" to='/cart'>
                            Cart
                          </NavLink>
                        </li>) : (<></>)}
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

                      {/* <li className="nav-item">
                      {!account.auth? ( <NavLink className="nav-link" to='/Login'>
                         <button className='login-button'>Login</button> 
                        </NavLink>) : (<NavLink className="nav-link">
                         <button 
                         className='login-button'
                          onClick={Logout}
                         >Logout</button> 
                        </NavLink>)}

                      </li> */}
                    </ul>

                  </div>
                </nav>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3  row'>

                {!account.auth ? (<button className='login-button' ><NavLink className="nav-link" to='/login'>Login</NavLink></button>) : (
                  <>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                      <CartIcon></CartIcon>
                    </div>
                    <div className=' col-xl-6 col-lg-6 col-md-6 col-sm-6 '>
                      <div className='profile-container '>
                        <div className='profile_image' >
                          <NavLink className="nav-link" ><img src="./assets/images/saya.png" alt="#" onClick={toggleProfile} /></NavLink>
                        </div>
                        <div className={`profile ${isProfileOpen ? 'open' : ''}`}>
                          <div className="profile-header">
                            <span className="main-color-text" />
                            Hello {account.email}
                            <div className="profile-total">
                              <span className="lighter-text"></span>
                              <span className="main-color-text" />
                            </div>
                          </div>
                          <ul className="profile-items">
                            <li className="clearfix">
                              <i className="fa-solid fa-user" ><NavLink className="nav-link logout" >Profile</NavLink></i>
                            </li>
                          </ul>
                          <ul className="profile-items">
                            <li className="clearfix">
                              <i className="fa-solid fa-right-from-bracket "><NavLink className="nav-link logout" onClick={Logout} >Logout</NavLink></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}



              </div>

            </div>
          </div>
        </div>
      </header>

    </div>
  );
}

export default Header;
