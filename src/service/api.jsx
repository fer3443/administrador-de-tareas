import { server } from "../config/server_constant";
export async function LoginUser({ userName, password, allowLS }) {
  try {
    const body = JSON.stringify({
      userName,
      password,
      allowLS
    });
    const response = await fetch(`${server.URL_LOCAL}/user/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: body,
    });
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