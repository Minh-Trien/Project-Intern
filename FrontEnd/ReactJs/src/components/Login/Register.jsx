import React from 'react'
import { useState } from 'react'
import { register } from '../../Service/authService';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {  toast } from 'react-toastify';
function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] =  useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

  const handleRegister = () => {
    // Xử lý đăng nhập thành công và sau đó thực hiện điều hướng tới trang bảo mật
    navigate('/login');
  };
    const Register = async (email,password,firstName,lastName, phone, address)=> {
         let res = await register(email, password,firstName, lastName, phone, address);
         console.log(res);
         if(res.data){
            handleRegister();
            toast.success(res.data.message); 
         }else{
         }
    }
    const HandlEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const HandlPasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const HandlFirstNameChange = (event) => {
        setFirstName(event.target.value);
      };
  
    const HandlLastNameChange = (event) => {
        setLastName(event.target.value);
      };
      
    const HandlPhoneChange = (event) => {
        setPhone(event.target.value);
    };
  
    const HandlAddressChange = (event) => {
        setAddress(event.target.value);
      };
  return (
    <div className="container">
  {/* Outer Row */}
  <div className="row justify-content-center">
    <div className="col-xl-10 col-lg-12 col-md-9">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* Nested Row within Card Body */}
          <div className="row">
            <div className="col-lg-6 d-none d-lg-block bg-login-image" />
           


            <div className="col-lg-6">
              
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                </div>
                <form className="user">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-user"
                      id="exampleInputEmail"
                      aria-describedby="emailHelp"
                      placeholder="Enter Email Address..."
                      onChange={HandlEmailChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-user"
                      id="exampleInputPassword"
                      placeholder="Password"
                      onChange={HandlPasswordChange}
                    />
                  </div>
                  <div className="form-group row">
                    <div className='col-md-6 my-2'>
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleInputPassword"
                      placeholder="FirstName"
                      onChange={HandlFirstNameChange}
                    />
                    </div>
                    <div className='col-md-6 mt-2'>
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleInputPassword"
                      placeholder="LastName"
                      onChange={HandlLastNameChange}
                    />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className='col-md-6 my-2'>
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleInputPassword"
                      placeholder="phone"
                      onChange={HandlPhoneChange}
                    />
                    </div>
                    <div className='col-md-6 mt-2'>
                    <input
                      type="address"
                      className="form-control form-control-user"
                      id="exampleInputPassword"
                      placeholder="address"
                      onChange={HandlAddressChange}
                    />
                    </div>
                  </div>               
                  <a
                    onClick={()=> Register(email, password, firstName,lastName, phone, address)}
                    className="btn btn-secondary btn-user btn-block"
                  >
                    Register
                  </a>
                  <hr />
                </form>
                <hr />
                <div className="text-center">                  
                    <NavLink className="nav-link" to='/login'>
                        <a className="small" >Login with your Account!</a>        
                    </NavLink>              
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Register