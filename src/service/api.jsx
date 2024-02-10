import { server } from "../config/server_constant";
import { Notification } from '../service/ToastNotification'
export async function LoginUser({ userName, password }) {
  try {
    const body = JSON.stringify({
      userName,
      password
    });
    const response = await fetch(`${server.URL_LOCAL}/user/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status} - ${errorData.msg_error}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en el login ", error);
    throw new Error("Hubo un error al iniciar sesion");
  }
}

export async function CreateUser({name, userName, password, avatar}){
  try {
    const body = JSON.stringify({
      name,
      userName,
      password,
      avatar
    })
    const response = await fetch(`${server.URL_LOCAL}/user/add`, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: body
    })
    if(!response.ok){
      const errorData = await response.json()
      console.error('Error en el servidor '+ response.status)
      throw new Error(errorData.msg_error)
    }
    return await response.json()
  } catch (error) {
    throw error
  }
}