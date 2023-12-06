import customize from "./axiosProduct"

const AddToCart = (sessionId,productId,quantity) => {
    const cartItem = {
      ProductId: productId,
      Quantity: quantity,
      // You can set other properties here based on your data structure      
      SessionId : sessionId
    };
    return customize.post(`/api/carts`, cartItem);
}

const featchCarts = (sessionId) =>{
    return customize.get(`/api/carts?sessionID=${sessionId}`, sessionId);
}

const updateCarts = (id,quantity) => {
  const cartItem = {
    Id : id,
    Quantity: quantity
    // You can set other properties here based on your data structure      
    
  };
  return customize.put(`/api/carts/${id}`,cartItem )
}

const removeCartItem = (id) => {
  return customize.delete(`/api/carts/${id}`);
}

const addNewSession = (id) => {
  return customize.post(`/api/session?UserID=${id}`)
}

const deleteAllCart = (sessionId) => {
  return customize.delete(`/api/carts/deleteAll?sessionId=${sessionId} `)
}

export {AddToCart, featchCarts, updateCarts,removeCartItem,addNewSession,deleteAllCart}