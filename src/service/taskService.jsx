import { server } from "../config/server_constant";

export async function AddTask({ title, description, date, token }) {
  try {
    const body = JSON.stringify({
      title,
      description,
      date
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