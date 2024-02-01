import React, { useState } from "react";
import { CreateUser } from "../../service/api";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../loader/Loader";

import "../register/RegisterUser.css";

export const RegisterUser = () => {
  const [dataUser, setDataUser] = useState({
    name: "",
    userName: "",
    password: "",
    passConfirm: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);//agregar el loader
  const navigate = useNavigate();
  const validations = () => {};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    CreateUser({
      name: dataUser.name,
      userName: dataUser.userName,
      password: dataUser.password,
      avatar: dataUser.avatar,
    })
      .then((res) => {
        setDataUser({
          name: "",
          userName: "",
          password: "",
          passConfirm: "",
          avatar: "",
        });
        navigate("/");
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="section-register section">
      <Link to={"/"} className="link-back">
        Login
      </Link>
      <div className="container-register container grid">
        <div className="wrapper">
          <h2 className="section-title">Registro</h2>
          <hr />
          <h3 className="section-subtitle">Ingrese los siguientes datos</h3>
          <form action="">
            <div className="box-input">
              <input
                type="text"
                name="name"
                value={dataUser.name}
                onChange={handleChange}
                placeholder="Nombre"
                maxLength={30}
                required
              />
            </div>
            <div className="box-input">
              <input
                type="text"
                name="userName"
                value={dataUser.userName}
                onChange={handleChange}
                placeholder="Usuario"
                maxLength={20}
                required
              />
            </div>
            <div className="box-input">
              <input
                type="password"
                name="password"
                value={dataUser.password}
                onChange={handleChange}
                placeholder="Contraseña"
                required
              />
            </div>
            <div className="box-input">
              <input
                type="password"
                name="passConfirm"
                value={dataUser.passConfirm}
                onChange={handleChange}
                placeholder="Confirmar contraseña"
                required
              />
            </div>
            <div className="box-input">
              <input
                type="text"
                name="avatar"
                value={dataUser.avatar}
                onChange={handleChange}
                placeholder="Url avatar"
                required
              />
            </div>
            <button
              type="submit"
              className="btn"
              onClick={handleSubmit}
            >registrarse</button>
          </form>
        </div>
      </div>
    </section>
  );
};
