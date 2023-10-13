import React from 'react'
import { useState } from 'react'
import { login } from '../../Service/authService';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {  toast } from 'react-toastify';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberme] = useState(true);
    const navigate = useNavigate();

  const handleLogin = () => {
    // Xử lý đăng nhập thành công và sau đó thực hiện điều hướng tới trang bảo mật
    navigate('/');
  };
    const Login = async (email,password,rememberme)=> {
        setRememberme(true);
         let res = await login(email, password,rememberme);
         if( res &&res.data &&res.data.data.accessToken){       
          handleLogin();
          toast.success(res.data.message);  
         }else{
          toast.error("email or pass wrong!")
         }
        }
    


    const HandlEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const HandlPasswordChange = (event) => {
      setPassword(event.target.value);
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
                  <div className="form-group">
                    <div className="custom-control custom-checkbox small">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck"
                      >
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <a
                    onClick={()=> Login(email, password)}
                    className="btn btn-secondary btn-user btn-block"
                  >
                    Login
                  </a>
                  <hr />
                  <a
                    href="index.html"
                    className="btn btn-google btn-user btn-block"
                  >
                    <i class="fa-brands fa-google"></i> Login with Google
                  </a>
                  <a
                    href="index.html"
                    className="btn btn-facebook btn-user btn-block"
                    >
                    <i className="fab fa-facebook-f fa-fw" /> Login with
                    Facebook
                  </a>
                </form>
                <hr />
                <div className="text-center">
                  <a className="small" href="forgot-password.html">
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                <NavLink className="nav-link" to='/register'>
                        <a className="small" >Create an Account!</a>        
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

export default Login