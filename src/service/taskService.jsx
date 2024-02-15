import { server } from "../config/server_constant";

export async function AddTask({ title, description, createdAt , token }) {
  try {
    const body = JSON.stringify({
      title,
      description,
      createdAt
    });
    const response = await fetch(`${server.URL_LOCAL}/task`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        'authorization': `Bearer ${token}`,
      },
      body: body,
    });
		if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status} - ${errorData.error_msg}`);
    }
		return await response.json()
  } catch (error) {
		console.error("Error al crear una tarea ", error);
    throw new Error("Hubo un error al crear una tarea");
	}
}
//trae tareas por usuario
export async function GetTaskByUser({token}){
  try {
    const response = await fetch(`${server.URL_LOCAL}/task`, {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })
    if(!response.ok){
      const errorData = await response.json();
      throw new Error(`Error ${response.status} - ${errorData.error_msg}`);
    }
    return await response.json()
  } catch (error) {
    throw new Error("Error al leer tareas " + error)
  }
}
//trae tarea por ID
export async function GetTaskById({id}){
  try {
    const response = await fetch(`${server.URL_LOCAL}/task/${id}`)
    if(!response){
      const errorData = await response.json()
      console.error('error en el servidor '+ response.status)
      throw new Error(errorData.msg_error)
    }
    return await response.json()
  } catch (error) {
    throw(error)
  }
}
//borrar tareas de forma temporal
export async function TemporalDelete({token, id}){
  try {
    const response = await fetch(`${server.URL_LOCAL}/task/temp-del/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })
    if(!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status} - ${errorData.error_msg}`);
    }
    return await response.json()
  } catch (error) {
    throw new Error("Error al eliminar tarea " + error)
  }
}

export async function DeleteTask({token, id}){
  try {
    const response = await fetch(`${server.URL_LOCAL}/task/${id}`,{
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })
    if(!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status} - ${errorData.msg_error}`);
    }
    return await response.json()
  } catch (error) {
    throw new Error("Error al eliminar tarea " + error)
  }
}

export async function UpdateTask({taskId, token, title, description,createdAt, completed}){ //no esta completa falta ver authorization
  try {
    const body = JSON.stringify({
      title,
      description,
      createdAt,
      completed
    })
    const response = await fetch(`${server.URL_LOCAL}/task/${taskId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body:body,
    })
    if(!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status} - ${errorData.msg_error}`);
    }
    return await response.json()
  } catch (error) {
    throw error
  }
}