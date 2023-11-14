import customize from "./axios"

const login = (email, password, rememberme) =>{
    return customize.post(`/api/auth/login`,{email, password,rememberme} );
}

const register = (email, password, firstName, lastName, phone, address  ) => {
    return customize.post("/api/auth/register", {email, password, firstName, lastName, phone, address});
}

const confirmEmail = (email, password, firstName, lastName, phone, address, otp) => {
    return customize.post("/api/auth/confirmEmail", {email, password, firstName, lastName, phone, address},otp);
}

const sendEmail = (email, password, firstName, lastName, phone, address) => {
    return customize.post("/api/auth/sendEmail", {email, password, firstName, lastName, phone, address});
}

const test = (token) => {
    return customize.get('/api/auth/Test', {headers: {
        Authorization : `Bearer ${token}`,},   
    })
}

export {login, register,confirmEmail,sendEmail, test}