import { BASE_PATH } from "../utils/utils";

export async function loginAPI(formData) {
    try {
        const compositeUrl = `${BASE_PATH}/api/auth/login`;
        const params = {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(formData),
        };
        const response = await fetch(compositeUrl, params);
        if(response.status!==200){
            throw new Error("Credenciales incorrectas");
        }
        const result=await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function registerAPI(formData){
    try{
        const compositeUrl=`${BASE_PATH}/api/auth/registro`;
        const params={
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        };

        const response=await fetch(compositeUrl,params);
        if(response.status!==201){
            throw new Error("No se ha podido registrar al usuario");
        }
        return true;
    }catch(error){
        console.error(error);
    }
}

export async function getMeAPI(token){
    try{
        const compositeUrl=`${BASE_PATH}/api/user/me`;
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: 'cors',
        };
        const response=await fetch(compositeUrl,params);
        const result=await response.json();
        return result;
    }catch(error){
        return null;
    }
}

