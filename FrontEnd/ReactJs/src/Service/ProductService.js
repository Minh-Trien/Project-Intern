import customize from "./axiosProduct"

const fetchAllProduct = (page) => {
    return customize.get(`/api/product/NoHidden?page=${page}`);
}
const fetchAllTask = () => {
    return customize.get("/api/task");
}
const GetProductsByTaskId = (taskid, page) => {
    return customize.get(`/api/product/task?id=${taskid}&page=${page}`, taskid, page);
}

const GetProductsById = (id) => {
    return customize.get(`/api/product/${id}`);
}

const getSearch = (keyword, page) => {
    return customize.get(`/api/product/searchNoHidden?keyword=${keyword}&page=${page}`);
}

const loginAPI = (email, password) => {
    return customize.get(`/api/login`, email, password)
}

export { fetchAllProduct, fetchAllTask, GetProductsByTaskId, getSearch, loginAPI,GetProductsById }; 