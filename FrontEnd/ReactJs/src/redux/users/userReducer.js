import { 
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR ,
    FETCH_USER_LOGIN,
    USER_REFRESH,
    FETCH_USER_LOGOUT,
    USER_REGISTER

    } from './userAction';


    const INITIAL_STATE = {

        account: {
            email: '',
            auth: '',
            role: '',         
            sessionId: '',    
        },
        
    };

    const userReducer = (state = INITIAL_STATE, action) => {

        switch (action.type) {
            case FETCH_USER_LOGIN:
                return {                  
                ...state,   
                };
            case FETCH_USER_SUCCESS:
               console.log(">>check action", action)
                return {
                    ...state,
                    account: {
                    email: action.data.email,
                    auth : true,
                    role : action.data.role,
                    sessionId : action.data.sessionId
                }
               };

            case FETCH_USER_ERROR:

                return {
                  ...state,
                  account: {                    
                    auth: false,                  
                    }
               };
            
            case FETCH_USER_LOGOUT:
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                return {
                  ...state,
                  account: {
                    email: '',
                    auth: false,
                    role: ""
                    }
               };
               
            case USER_REFRESH:
                
                return {
                  ...state,
                  account: {
                    auth: true,
                    email : action.data.email,
                    role : 'user',
                    sessionId : action.data.sessionId
                    }
               };

            case USER_REGISTER:               
                return {
                 ...state,
                 account: {
                   email: '',
                   auth: false,
                   }         
            };
            
            default: return state;
        }

    };
    
    export default userReducer;