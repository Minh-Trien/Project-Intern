import customize from "./axiosAuth";

const GetAllHeader = (rollName) =>{
    return customize.get(`/api/header?rollName=${rollName}`);
}

export {GetAllHeader};