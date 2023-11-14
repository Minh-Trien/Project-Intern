import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { confirmEmail } from '../../Service/authService';
import '../assets/confirm.css';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { join } from 'lodash';
function ConfirmEmail() {
    const[otp, setOtp] = useState("");
    const navigate = useNavigate();
    const HandlOtpChange = (event) => {
        setOtp(event.target.value);
    };
    const  Confirm = async ()=>{
    var user = JSON.parse( localStorage.getItem('userRegister'));
        var email = user.email;
        var password = user.password;
        var firstName = user.firstName;
        var lastName = user.lastName;
        var phone = user.phone;
        var address = user.address;
      let res = await  confirmEmail(  email, password, firstName, lastName, phone, address, otp);
      console.log( res);
      toast.success("Register Success");
      navigate('/Login');
      localStorage.removeItem('userRegister');
    }
  return (
    <>
    <div className='container my-5 main '>     
      <Form.Control
        type="text"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        onChange={HandlOtpChange}
        placeholder='Please open your email to take OTP.'
        />   
              
        <div className='btn-confirm ml-3'>
        <a   
        className="btn btn-secondary btn-user btn-block"
        onClick={Confirm}
        >
        Confirm
      </a></div>    
      </div>
    </>
  );
}

export default ConfirmEmail;