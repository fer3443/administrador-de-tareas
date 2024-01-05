import React, { useState } from "react";
import { LoginUser } from "../../service/api";
import { Loader } from "../loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import "../login/Login.css";
export const Login = () => {
  const [data, setData] = useState({
    userName: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    LoginUser({
      userName: data.userName,
      password: data.password,
    })
      .then((res) => {
        setLoading(false);
        console.log(res),
          setData({
            userName: "",
            password: "",
          });
      })
      .catch((err) => console.log(err));
  }
  return (
    <section className="section-login">
      {loading ? (
        <Loader />
      ) : (
        <form action="" className="form-login">
          <span className="section-title">Bienvenido</span>
          <div className="box-input">
            <input
              type="text"
              name="userName"
              value={data.userName}
              onChange={handleChange}
              placeholder="nombre de usuario"
            />
            <FontAwesomeIcon icon={faUser} className="icon-form" />
          </div>
          <div className="box-input">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="contraseña"
            />
            <FontAwesomeIcon
              icon={faLock}
              className={showPass ? "icon-form hidden" : "icon-form"}
              onClick={() => setShowPass(!showPass)}
            />
            <FontAwesomeIcon
              icon={faUnlock}
              className={
                showPass ? "icon-form-unlock" : "icon-form-unlock hidden"
              }
              onClick={() => setShowPass(!showPass)}
            />
          </div>
          <div className="check">
            <label>mantenerme conectado </label>
            <input
              type="checkbox"
              name="allowLS"
              id=""
              checked={data.allowLS}
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit} className="btn">
            Iniciar sesión
          </button>
          <div className="form-footer">
            <p className="form-footer-txt">
              ¿No tienes cuenta? por favor registrate aquí
            </p>
          </div>
        </form>
      )}
    </section>
  );
};
