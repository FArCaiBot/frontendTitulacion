import { BASE_PATH } from "../utils/utils";


export async function getPeriodosAPI() {
  try {
    const compositeUrl = `${BASE_PATH}/api/periodo`;
    const response = await fetch(compositeUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    return []
  }
  ;
}

export async function guardarPerido(formData) {
  try {
    const compositeUrl = `${BASE_PATH}/api/periodo`;
    const params = {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
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

export async function eliminarPeriodo(id){
  try{
    const compositeUrl=`${BASE_PATH}/api/periodo/${id}`;
    const params={
      method: "DELETE",
      headers: {
        'Content-Type': "application/json",
      },
    };
    const result=await fetch(compositeUrl,params);
    return result;
  }catch(error){
    return null;
  }
}