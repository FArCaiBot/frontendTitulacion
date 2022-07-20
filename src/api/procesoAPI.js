import { BASE_PATH } from "../utils/utils";

export async function listarProcesos(token){
    try {
        const compositeUrl = `${BASE_PATH}/api/proceso`;
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
        const response = await fetch(compositeUrl, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return [];
    }
}

export async function guardarProceso(formData, token) {
    const compositeUrl = `${BASE_PATH}/api/proceso`;
    const params = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
    };
    const response = await fetch(compositeUrl, params);
    return response;
}
