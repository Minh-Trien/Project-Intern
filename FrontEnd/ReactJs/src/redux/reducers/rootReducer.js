import { combineReducers } from 'redux';

import userReducer from '../users/userReducer';
import productsReducer from '../product/productReducer';

const rootReducer = combineReducers({
    user: userReducer, cart : productsReducer
});

export default rootReducer;