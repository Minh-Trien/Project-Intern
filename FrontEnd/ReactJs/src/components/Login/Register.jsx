import React from 'react'
import { useState } from 'react'
import { register, sendEmail } from '../../Service/authService';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleRegister } from '../../redux/users/userAction';
import { useDispatch, useSelector } from 'react-redux';
function Register() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Register = async (email, password, firstName, lastName, phone, address) => {
    if (!isValidEmail(email)) {
      console.error("Invalid email format");
      toast.error("Invalid email format");
      return;
    }
    if (password.length < 6) {
      console.error("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!isValidPhone(phone)) {
      console.error("Invalid phone number format");
      toast.error("Invalid phone number format");
      return;
    }
    const user = {
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
    };

    localStorage.setItem('userRegister', JSON.stringify(user));
    navigate('/confirmEmail');
    let res = await sendEmail(email, password, firstName, lastName, phone, address);

    if (res) {
      localStorage.setItem('userRegister', JSON.stringify(user));
      console.log(res);
      // handleRegister();
      // toast.success(res.data.message);
    } else {
      // Xử lý khi gửi email không thành công
    }
  }

  const isValidEmail = (email) => {
    return email.includes('@');
  }

  const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
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
                        onClick={() => Register(email, password, firstName, lastName, phone, address)}
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