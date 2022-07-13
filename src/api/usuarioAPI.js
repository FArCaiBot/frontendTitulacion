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
        if (response.status !== 200) {
            throw new Error("Credenciales incorrectas");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function registerAPI(formData) {
    const compositeUrl = `${BASE_PATH}/api/auth/registro`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    };

    const response = await fetch(compositeUrl, params);
    return response;

}

export async function getMeAPI(token) {
    try {
        const compositeUrl = `${BASE_PATH}/api/user/me`;
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: 'cors',
        };
        const response = await fetch(compositeUrl, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}

export async function changePassword(id,newpass, token){
    const compositeUrl=`${BASE_PATH}/api/user/${id}/change/${newpass}`;
    const params = {
        method:'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };
    const response = await fetch(compositeUrl, params);
    return response;
}

