import React from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Product from './Product/Product';
import Home from './Home/Home';
import Header from './Layout/Header';
import Contact  from './Contact/Contact';
import Cart from './Cart/Cart';
import Footer from './Layout/Footer';
import NewsFeed from './NewsFeed/NewsFeed';
import { CartProvider } from './Cart/CartContext';
import Login from './Login/Login';
import Register from './Login/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Main() {
  return (
    <div>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <CartProvider>
      <Header /> 
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route  path='/product' element={<Product />}  /> 
          <Route  path='/cart' element={<Cart />}  /> 
          <Route  path='/newsFeed' element={<NewsFeed />}  /> 
          <Route  path='/contact' element={<Contact />}  /> 
          <Route  path='/login' element={<Login />}  />
          <Route  path='/register' element={<Register />}  />
      </Routes>
      </CartProvider>
      <Footer/>
     
    </div>
  );
}

export default Main;