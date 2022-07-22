import { BASE_PATH } from "../utils/utils";

export async function getEstAnteproy(token){
    try{
        const compositeUrl=`${BASE_PATH}/api/estado/anteproyecto`;
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

export async function guardarEstAnt(formData, token) {
    const compositeUrl = `${BASE_PATH}/api/estado/anteproyecto`;
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

export async function eliminarEstAnt(id, token){
    try{
        const compositeUrl=`${BASE_PATH}/api/estado/anteproyecto/${id}`;
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

export async function updateEstAnt(id, formData, token){
    const compositeUrl=`${BASE_PATH}/api/estado/anteproyecto/${id}`;
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

/* estados proyecto */
export async function getEstProy(token){
  try{
      const compositeUrl=`${BASE_PATH}/api/estado/proyecto`;
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

export async function guardarEstProy(formData, token) {
  const compositeUrl = `${BASE_PATH}/api/estado/proyecto`;
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

export async function eliminarEstProy(id, token){
  try{
      const compositeUrl=`${BASE_PATH}/api/estado/proyecto/${id}`;
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

export async function updateEstProy(id, formData, token){
  const compositeUrl=`${BASE_PATH}/api/estado/proyecto/${id}`;
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

/* estados estudiante */
export async function getEstEstudiante(token){
  try{
      const compositeUrl=`${BASE_PATH}/api/estado/estudiante`;
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

export async function guardarEstEstudiante(formData, token) {
  const compositeUrl = `${BASE_PATH}/api/estado/estudiante`;
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

export async function eliminarEstEstudiante(id, token){
  try{
      const compositeUrl=`${BASE_PATH}/api/estado/estudiante/${id}`;
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

export async function updateEstEstudiante(id, formData, token){
  const compositeUrl=`${BASE_PATH}/api/estado/estudiante/${id}`;
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