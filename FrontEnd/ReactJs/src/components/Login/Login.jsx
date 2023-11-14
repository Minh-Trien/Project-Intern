import React, { useEffect } from 'react'
import { useState } from 'react'
import { login } from '../../Service/authService';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleLoginRedux } from '../../redux/users/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../../redux/users/userAction';
import axios from 'axios';
function Login() {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(true);
  const account = useSelector(state => state.user.account);
  const navigate = useNavigate();

  useEffect(() => {
    if (account && account.auth === true) {
      navigate('/');
    }

  }, [account])
  const Login = async () => {
    setRememberme(true);
    dispatch(handleLoginRedux(email, password, rememberme));
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
      <div className="row justify-content-center my-5">
        <div className="col-xl-10 col-lg-12 col-md-9 mb-5">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0 mb-5">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 bg-login-image" ><figure className='logo-login'><img src="./assets/images/login.png" /></figure></div>
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
                        onClick={() => Login(email, password)}
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
                      <a
                        className="small"
                      >
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