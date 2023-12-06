import customize from "./axiosProduct"
const token = JSON.parse(localStorage.getItem('user')); 
console.log(token.accessToken)
const CreateOrder = ( total) =>{
    const token = JSON.parse(localStorage.getItem('user')); 
    return customize.post("/api/orderDetail", { total} , {
        headers: {
        Authorization : `Bearer ${token.accessToken}`,
        },   
    })
    
}

const CreateOrderItem = ( orderID, ProductId, Quantity) =>{
    const token = JSON.parse(localStorage.getItem('user')); 
    return customize.post("/api/orderDetail/orderItems", { orderID, ProductId, Quantity} , {
        headers: {
        Authorization : `Bearer ${token.accessToken}`,
        },   
    })
    
}


export {CreateOrder,CreateOrderItem}