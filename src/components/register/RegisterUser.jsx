import React, { useState } from "react";
import { CreateUser } from "../../service/api";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../loader/Loader";

import "../register/RegisterUser.css";
import { Notification } from "../../service/ToastNotification";
export const RegisterUser = () => {
  const [dataUser, setDataUser] = useState({
    name: "",
    userName: "",
    password: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false); //agregar el loader
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if(dataUser.name.trim() === "" || dataUser.userName.trim()==="" || dataUser.password.trim() === ""){
      Notification({message: 'Todos los campos deben ser completados', type: 'error'});
      return false
    }
    if(dataUser.name.length < 3 || dataUser.userName.length < 3){
      Notification({message: 'El nombre y el usuario deben tener por lo menos 3 caracteres', type: 'error'});
      return false
    }
    const alphanumeric = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if(!alphanumeric.test(dataUser.password)){
      Notification({message: 'La contraseña debe tener como minimo 6 caracteres incluyendo una mayuscula y un numero', type: 'error'});
      return false
    }
    return true
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
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
          avatar: "",
        });
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Notification({
          message: `${err}`,
          type: 'error'
        })
      });
  };

  return (
    <section className="section-register section">
      {loading ? (
        <Loader />
      ) : (
        <div>
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
                    minLength={3}
                    maxLength={30}
                  />
                </div>
                <div className="box-input">
                  <input
                    type="text"
                    name="userName"
                    value={dataUser.userName}
                    onChange={handleChange}
                    placeholder="Usuario"
                    minLength={3}
                    maxLength={20}
                  />
                </div>
                <div className="box-input">
                  <input
                    type="password"
                    name="password"
                    value={dataUser.password}
                    onChange={handleChange}
                    minLength={6}
                    placeholder="Contraseña"
                  />
                </div>
                <div className="box-input">
                  <input
                    type="text"
                    name="avatar"
                    value={dataUser.avatar}
                    onChange={handleChange}
                    placeholder="Url avatar"
                  />
                </div>
                <button type="submit" className="btn" onClick={handleSubmit}>
                  registrarse
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
