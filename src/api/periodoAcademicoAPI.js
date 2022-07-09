import { BASE_PATH } from "../utils/utils";


export async function getPeriodosAPI(token) {
  try {
    const compositeUrl = `${BASE_PATH}/api/periodo`;
    const params={
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }
    const response = await fetch(compositeUrl,params);
    const result = await response.json();
    return result;
  } catch (error) {
    return []
  }
  ;
}

export async function guardarPerido(formData,token) {
  try {
    const compositeUrl = `${BASE_PATH}/api/periodo`;
    const params = {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(compositeUrl, params);
    const result = await response.json();
    console.log(result);
    return result;

  } catch (error) {
    return null;
  }
}

export async function actualizarPeriodo(id,formData, token){
  try{
    const compositeUrl=`${BASE_PATH}/api/periodo/${id}`;
    const params={
      method:"PUT",
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      },
      body:JSON.stringify(formData),
    };

    const response=await fetch(compositeUrl,params);
    const result=await response.json();
    return result;
  }catch(error){
    return null;
  }
}

export async function eliminarPeriodo(id, token){
  try{
    const compositeUrl=`${BASE_PATH}/api/periodo/${id}`;
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