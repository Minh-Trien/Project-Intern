import {
  FETCH_CARTS,
  FETCH_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FETCH_SINGLE_PRODUCT,
  SEARCH_PRODUCT,
  FETCH_PRODUCT_BY_TASK,
  UPDATE_CARTS
} from './productType';

const initialState = {
  loading: true,
  products: [],
  cartItems: [],
  singleProduct: {},
  totalPages: null
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: action.payload.data.$values,
        totalPages: action.payload.totalPages
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload.data.$values
      }
    case REMOVE_FROM_CART:
      const cartItemIndexa = state.cartItems.findIndex(item => item.id === action.payload.data.id);

      if (cartItemIndexa === -1) {
        return state;
      }

      const updatedCartItemsa = [
        ...state.cartItems.slice(0, cartItemIndexa),
        ...state.cartItems.slice(cartItemIndexa + 1)
      ];

      return {
        ...state,
        cartItems: updatedCartItemsa
      };

    case FETCH_SINGLE_PRODUCT:
      return {
        ...state,
        loading: false,
        singleProduct: action.payload,
      };

    case FETCH_PRODUCT_BY_TASK:
      return {
        ...state,
        loading: false,
        products: action.payload.data.$values,
        totalPages: action.payload.totalPages
      };

    case SEARCH_PRODUCT:
      return {
        ...state,
        loading: false,
        products: action.payload.data.$values,
        totalPages: action.payload.totalPages
      };

    case FETCH_CARTS:
      return {
        ...state,
        cartItems: action.payload
      };

    case UPDATE_CARTS:
      const cartItemIndex = state.cartItems.findIndex(item => item.id === action.payload.data.id);

      if (cartItemIndex === -1) {
        return state;
      }

      const updatedCartItem = {
        ...state.cartItems[cartItemIndex],
        // Thực hiện các thay đổi cần thiết cho cartItem
        // Ví dụ: name: action.payload.name, price: action.payload.price
        quantity: action.payload.data.quantity
      };

      const updatedCartItems = [
        ...state.cartItems.slice(0, cartItemIndex),
        updatedCartItem,
        ...state.cartItems.slice(cartItemIndex + 1)
      ];

      return {
        ...state,
        cartItems: updatedCartItems
      };
    default:
      return state;
  }
};

export default productsReducer;