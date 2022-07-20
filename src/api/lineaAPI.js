import { BASE_PATH } from "../utils/utils";

export async function getLineas(token){
    try{
        const compositeUrl=`${BASE_PATH}/api/lineas`;
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
        const response=await fetch(compositeUrl, params);
        const result=await response.json();
        return result;
    }catch(error){
        return [];
    }
  }

  
export async function guardarLinea(formData, token) {
    const compositeUrl = `${BASE_PATH}/api/lineas`;
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

  export async function eliminarLinea(id, token){
    try{
        const compositeUrl=`${BASE_PATH}/api/lineas/${id}`;
        const params={
          method: "DELETE",
          headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
          },
        };
        const result=await fetch(compositeUrl,params);
        return result;
      }catch(error){
        return null;
      }
  }

  export async function actualizarLinea(id, formData, token){
    const compositeUrl=`${BASE_PATH}/api/lineas/${id}`;
    const params={
      method:"PUT",
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      },
      body:JSON.stringify(formData),
    };

    const response=await fetch(compositeUrl,params);
    return response;
}