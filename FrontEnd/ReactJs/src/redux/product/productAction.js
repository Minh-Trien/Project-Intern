import axios from 'axios';
import { fetchAllProduct, GetProductsByTaskId, getSearch, fetchAllTask, GetProductsById } from '../../Service/ProductService';
import { AddToCart, featchCarts, updateCarts, removeCartItem } from '../../Service/cartService';
import {
    FETCH_PRODUCTS,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    FETCH_SINGLE_PRODUCT,
    FETCH_PRODUCT_BY_TASK,
    SEARCH_PRODUCT,
    FETCH_CARTS,
    UPDATE_CARTS
} from './productType';

export const fetchProducts = (page) => {
    return async (dispatch) => {
        try {
            const response = await fetchAllProduct(page);
            dispatch({
                type: FETCH_PRODUCTS,
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const addToCart = (sessionId, productId, quantity) => {
    return async (dispatch) => {
        try {
            const response = await AddToCart(sessionId, productId, quantity);
            console.log(response)
            dispatch({
                type: ADD_TO_CART,
                payload: response,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateCart = (id, quantity) => {
    return async (dispatch) => {
        try {
            const response = await updateCarts(id, quantity);
            console.log(response)
            dispatch({
                type: UPDATE_CARTS,
                payload: response,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const removeFromCart = (itemID) => {
    return async (dispatch) => {
        try {
            const response = await removeCartItem(itemID);
            console.log(response)
            dispatch({
                type: REMOVE_FROM_CART,
                payload: response,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const fetchSingleProduct = (id) => {
    return async (dispatch) => {
        try {
            const response = await GetProductsById(id);
            console.log(response)
            dispatch({
                type: FETCH_SINGLE_PRODUCT,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const searchProduct = (keyword) => {

    return async (dispatch) => {
        console.log(keyword)
        try {
            const response = await getSearch(keyword);
            console.log(response)
            dispatch({
                type: SEARCH_PRODUCT,
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export const featchByTaskId = (id, page) => {
    return async (dispatch) => {
        try {
            const response = await GetProductsByTaskId(id, page);
            console.log(response)
            dispatch({
                type: FETCH_PRODUCT_BY_TASK,
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export const featchCart = (sessionId) => {
    return async (dispatch) => {
        try {
            const response = await featchCarts(sessionId);
            if (response && response.data && response.data.$values) {
                dispatch({
                    type: FETCH_CARTS,
                    payload: response.data.$values
                });
            } else {
                // Xử lý trường hợp khi dữ liệu không đúng định dạng hoặc thiếu
                console.log("Error")
            }
        } catch (error) {
            console.log(error);
        }
    }
}




