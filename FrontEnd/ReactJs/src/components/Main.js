import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './Product/Product';
import Home from './Home/Home';
import Header from './Layout/Header';
import Contact from './Contact/Contact';
import Cart from './Cart/Cart';
import Footer from './Layout/Footer';
import NewsFeed from './NewsFeed/NewsFeed';
import Login from './Login/Login';
import Register from './Login/Register';
import ProductDetail from './Product/ProductDetail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmEmail from './Login/ConfirmEmail';
import Profile from './Profile/Profile';
//import NavBar from './Layout/NavBar';
function Main() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/newsFeed' element={<NewsFeed />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/confirmEmail' element={<ConfirmEmail />} />
        <Route path='/detailProduct' element={<ProductDetail />} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>

      <Footer />

    </div>
  );
}

export default Main;