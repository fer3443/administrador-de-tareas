import { server } from "../config/server_constant";

export async function LoginUser({ userName, password, allowLS }) {
  try {
    const body = JSON.stringify({
      userName,
      password,
      allowLS
    });
    const response = await fetch(`${server.URL_CONECTION}/user/login`, {
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
