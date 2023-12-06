import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from './Loading';
import CartIcon from '../Cart/CartIcon';
//import '../assets/header.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../../redux/users/userAction';
import { useNavigate } from 'react-router-dom';
import { handleRefreshRedux } from '../../redux/users/userAction'
import Dropdown from 'react-bootstrap/Dropdown';
import { featchCart, fetchProducts } from '../../redux/product/productAction';
import { GetAllHeader } from '../../Service/headerService';
import { Container, Nav, Navbar } from "react-bootstrap";
import "../assets/NavBar.css";
import { Link } from "react-router-dom";

    
function Header() {
   // const { cartList } = useSelector((state) => state.cart.cartItems);
    const  {cartList} = useState("");
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const account = useSelector(state => state.user.account);
  const [rollEveryone, setRollEveryone] = useState("everyone") 
  const [HeaderEveryOne, SetHeaderEveryOne] = useState([]);
  const [HeaderFollowRole, setHeaderFollowRole] = useState([]);
  const sessionId = useSelector(state => state.user.account.sessionId );

  const getAllHeader = async (rollEveryone) => { 
    let res = await GetAllHeader(rollEveryone);
    SetHeaderEveryOne(res.data.result.$values); 
  }

  const getHeaderRole = async (role) => { 
    let res = await GetAllHeader(role);
    setHeaderFollowRole(res.data.result.$values); 
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
        console.log(sessionId) 
     // dispatch(featchCart(sessionId)); 
    //  dispatch(fetchProducts(1)); 
    } 
  
  }, [dispatch]);
  useEffect(() => {
    getAllHeader(rollEveryone);  
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.accessToken) { 
      
      dispatch(featchCart(sessionId));  
    } 
  
  }, [sessionId]);


  return (
  <>
  <Loading></Loading>
    <Navbar
    fixed="top"
    expand="md"
    className={isFixed ? "navbar fixed" : "navbar"}
  >
     
 
  </Navbar>
  </>

  );
}

export default Header;
