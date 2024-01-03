import React, { useState } from "react";
import { LoginUser } from "../../service/api";

export const Login = () => {
  const [data, setData] = useState({
    userName: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
		
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    LoginUser({
      userName: data.userName,
      password: data.password,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return (
    <section>
      <form action="">
        <input
          type="text"
          name="userName"
          value={data.userName}
          onChange={handleChange}
          placeholder="nombre de usuario"
        />
        <input
          type="text"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="contraseña"
        />
      </form>
      <button type="submit" onClick={handleSubmit}>
        Iniciar sesión
      </button>
    </section>
  );
};
