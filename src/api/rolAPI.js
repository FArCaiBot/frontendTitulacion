import { BASE_PATH } from "../utils/utils";

export async function getRoles(token){
    try{
        const compositeUrl=`${BASE_PATH}/api/rol`;
        const params={
            'Authorization':`Bearer ${token}`
        }
        const response=await fetch(compositeUrl, params);
        const result=await response.json();
        return result;
    }catch(error){
        return [];
    }
}