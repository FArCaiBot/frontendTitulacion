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