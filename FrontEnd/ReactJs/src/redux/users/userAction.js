import { getIdByEmail, login, sendEmail } from '../../Service/authService';
import { toast } from 'react-toastify';
import { addNewSession } from '../../Service/cartService';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_LOGOUT = 'USER_LOGOUT';
export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_LOGOUT = 'FETCH_USER_LOGOUT';
export const USER_REFRESH = 'USER_REFRESH';



export const handleLoginRedux = (email, password, remember) => {
   return async (dispatch, getState) => {
      dispatch({ type: FETCH_USER_LOGIN });

      // Validate email và password trước khi gọi API login
      if (!isValidEmail(email)) {
         dispatch({
            type: FETCH_USER_ERROR,
            error: "Invalid email format",
         });
         toast.error( "Invalid email format");
         return;
      }

      if (password.length < 8) {
         dispatch({
            type: FETCH_USER_ERROR,
            error: "Password must be at least 6 characters",
         });
         toast.error("Password must be at least 6 characters")
         return;
      }

      let res = await login(email.trim(), password, remember);

      console.log(res);

      if (res && res.data && res.data.data && res.data.data.accessToken) {
         localStorage.setItem('user', JSON.stringify(res.data.data))
         localStorage.setItem('email', JSON.stringify(email))
         console.log(email);
         let resID = await getIdByEmail(email);
            console.log(resID.data);
      let resSession = await addNewSession(resID.data);
        console.log(resSession.data);
         dispatch({
            type: FETCH_USER_SUCCESS,
            data: {
               email: email.trim(),
               role : "user", 
               sessionId : resSession.data           
            }
         });
         
         toast(res.data.message);
      } else {
         dispatch({
            type: FETCH_USER_ERROR
         });
         toast.error("Email or password is incorrect!");
      }
   }
}

const isValidEmail = (email) => {
   return email.includes('@');
}

export const handleLogoutRedux = () => {
   return (dispatch, getState) => {
      localStorage.removeItem("user");
      dispatch({
         type: FETCH_USER_LOGOUT,
      },);
   }
}



export const handleRefreshRedux = () => {
   return async (dispatch, getState) => {
      try {
       let email = JSON.parse(localStorage.getItem('email'));
       //console.log(email)
       let resID = await getIdByEmail(email);
   //    console.log(resID.data);                                                               
     let resSession = await addNewSession(resID.data);
    // console.log(resSession.data);       
      dispatch({
         type: USER_REFRESH,
         data :{
            email : email,
           sessionId : resSession.data
         }
      },);} catch (error) {
         
      }
   }
}

export const handleRegister = (email, password, firstName, lastName, phone, address) => {
   return async (dispatch, getState) => {
      let res = await sendEmail(email, password, firstName, lastName, phone, address);
      if (res) {
         dispatch({
            type: USER_REGISTER,
         },);
         // handleRegister();
         // toast.success(res.data.message); 
      } else {

      }

   }
}


