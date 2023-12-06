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
import { GetAllHeader } from '../../Service/headerService';
import {
  AccountBox,
  Article,
  Home,
  ModeNight,
  People,
  Person,
  Settings,
  Storefront,
} from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
 
  Switch,
} from "@mui/material";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
function Header() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const account = useSelector(state => state.user.account);
  const [rollEveryone, setRollEveryone] = useState("everyone") 
  const [HeaderEveryOne, SetHeaderEveryOne] = useState([]);
  const [HeaderFollowRole, setHeaderFollowRole] = useState([]);
  const sessionId = useSelector(state => state.user.account.sessionId );

  const getAllHeader = async (rollEveryone) => { 
    let res = await GetAllHeader(rollEveryone);
    //console.log(res.data.result);
    SetHeaderEveryOne(res.data.result); 
  }

  const getHeaderRole = async (role) => { 
    let res = await GetAllHeader(role);
    setHeaderFollowRole(res.data.result); 
  }

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
    if(account.role){
      getHeaderRole(account.role);
    }else{
      setHeaderFollowRole("");
    }   
  }, [account])
  const email = JSON.parse(localStorage.getItem('email'));
  useEffect(() => {
    getAllHeader(rollEveryone);  
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.accessToken) { 
         dispatch(handleRefreshRedux());
         if(window.location.pathname == '/detailProduct'){
          navigate('/product');  
         }
         
        //console.log(sessionId) 
     // dispatch(featchCart(sessionId)); 
      dispatch(fetchProducts(1)); 
    } 
  
  }, [dispatch]);
  useEffect(() => {
    getAllHeader(rollEveryone);  
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.accessToken) { 
      
      dispatch(featchCart(sessionId));  
    } 
  
  }, [sessionId]);

  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  // fixed Header
  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  window.addEventListener("scroll", scrollHandler);
  return (
    <div>
      <Loading></Loading>
      <header  className={isFixed ? "top-header fixed" : "top-header"}>
        <div className="header ">
        
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section row">
              <div className='col-xl-2 col-lg-2 col-md-2 col-sm-2 '>
                </div>
                
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 '>
                  <div className="full">
                  <div className="center-desk">
                    <div className="logo ml-2">
                      {/* Use NavLink for navigation */}
                      <NavLink className="" to='/'>CherryBeauty</NavLink>
                    </div>
                  </div>
                </div>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 '>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 ">
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
                    {HeaderEveryOne && HeaderEveryOne.length > 0 && HeaderEveryOne
                  .map((item, index) => (
                      <li className="nav-item">
                        <NavLink className="nav-link" to={item.link}>{item.name}</NavLink>
                      </li>
                  ))}
                   {HeaderFollowRole && HeaderFollowRole.length > 0 && HeaderFollowRole
                  .map((item, index) => (
                      <li className="nav-item">
                        <NavLink className="nav-link" to={item.link}>{item.name}</NavLink>
                      </li>
                  ))}
                  {!account.auth ? (
                    <li className="nav-item">
                      
                        
                    <NavLink className="nav-link nav-login" to='/login'><i class="fa-solid fa-right-to-bracket fa-lg"></i> <span className='ml-2'>LOGIN</span></NavLink>    
                    </li>
                    ) : (<></>)}        
                    </ul>

                  </div>
                </nav>
              </div>
              <div className='col-xl-2 col-lg-2 col-md-2 col-sm-2  row'>

                {!account.auth ? (
                  <>
                  {/* <i class="fa-solid fa-right-to-bracket fa-lg"></i>                  
                  <NavLink className="nav-link" to='/login'>Login</NavLink>                   */}
                  </>
                ) : (
                  <>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 row'>
                      
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 '>
                      <CartIcon></CartIcon>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 '>
                    
                    </div>

                    </div>
                    <div className=' col-xl-6 col-lg-6 col-md-6 col-sm-6 '>
                    <div className='profile-container '>
                        <div className='profile_image' >
                          <NavLink className="nav-link" ><img src="./assets/images/profile.jfif" alt="#" onClick={toggleProfile} /></NavLink>
                        </div>
                        <div className={`profile ${isProfileOpen ? 'open' : ''}`}>
                          <div className="profile-header">
                            <span className="main-color-text" />
                            Hello {email}
                            <div className="profile-total">
                              <span className="lighter-text"></span>
                              <span className="main-color-text" />
                            </div>
                          </div>
                          <ul className="profile-items">
                            <li className="clearfix">
                              <i className="fa-solid fa-user" ><NavLink className="nav-link logout" to='/profile' >Profile</NavLink></i>
                            </li>
                          </ul>
                          <ul className="profile-items">
                            <li className="clearfix">
                              <i className="fa-solid fa-right-from-bracket "><NavLink className="nav-link logout" onClick={Logout} >Logout</NavLink></i>
                            </li>
                          </ul>
                          <ul className="profile-items">
                            <li className="clearfix">
                            <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon>
                <Switch
                  onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
                />
              </ListItemButton>
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
        
      </header >

    </div>
  );
}

export default Header;
