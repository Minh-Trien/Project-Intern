import customize from "./axios"

const login = (email, password, rememberme) =>{
    return customize.post(`/api/auth/login`,{email, password,rememberme} );
}

const register = (email, password, firstName, lastName, phone, address  ) => {
    return customize.post("/api/auth/register", {email, password, firstName, lastName, phone, address});
}

export {login, register}