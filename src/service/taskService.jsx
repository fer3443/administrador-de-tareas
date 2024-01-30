import { server } from "../config/server_constant";

export async function AddTask({ title, description, token }) {
  try {
    const body = JSON.stringify({
      title,
      description
    });
    const response = await fetch(`${server.URL_CONECTION}/task`, {
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
