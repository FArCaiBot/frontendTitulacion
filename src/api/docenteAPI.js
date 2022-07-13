import { BASE_PATH } from "../utils/utils";


export async function listarDocentes(token) {
    try {
        const compositeUrl = `${BASE_PATH}/api/docente`;
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

export async function guardarDocente(formData, token) {
    const compositeUrl = `${BASE_PATH}/api/docente`;
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

export async function eliminarDocente(id, token) {
        const compositeUrl = `${BASE_PATH}/api/docente/${id}`;
        const params = {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            },
        };
        const result = await fetch(compositeUrl, params);
        return result;    
}


