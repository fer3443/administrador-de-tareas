import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import { LoginUser } from "../../service/api";
import { Loader } from "../loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";

import "../login/Login.css";

export const Login = () => {
  const { setUserData } = useContext(UserContext)
  const [data, setData] = useState({
    userName: "",
    password: "",
    allowLS: false
  });
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
//   function validate(values){
//     if(!values.userName.trim()){
//       setErrors(errors.userName = 'El nombre de usuario es obligatorio')
//     }
//     if(!values.password.trim()){
//       setErrors(errors.password = 'El nombre de usuario es obligatorio')
//     }
//  }
  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    LoginUser({
      userName: data.userName,
      password: data.password,
    })
      .then((res) => {
        setLoading(false)
        setUserData({
          dataLogin: res,
          isLogged: true,
          allowLS: data.allowLS
        })
        console.log(res)
        setData((prevData) => ({
          ...prevData,
          userName: '',
          password: ''
        }))
        navigate('/home')
      })
      .catch((err) => {
        setLoading(false)
        setData((prevData) => ({
          ...prevData,
          userName: '',
          password: ''
        }))
      })
  }
  return (
    <section className="section-login">
      {loading ? (
        <Loader />
      ) : (
        <div className="wrapper">
          <h1>Login</h1>
          <form className="form-login">
          <div className="box-input">
            <input
              type="text"
              name="userName"
              value={data.userName}
              onChange={handleChange}
              placeholder="Nombre de usuario"
              required
            />
            <FontAwesomeIcon icon={faUser} className="icon-form" />
          </div>
          <div className="box-input">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
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
          <div className="remember-forgot">
            <label>
            <input
              type="checkbox"
              name="allowLS"
              checked={data.allowLS}
              onChange={handleChange}
            />Mantenerme conectado
            </label>
            <Link to={'/'} className="link-forgot">Olvide mi contraseña</Link>
          </div>
          <button type="submit" onClick={handleSubmit} className="btn">
            Iniciar sesión
          </button>
          <div className="register-box">
            <p>
              ¿No tienes cuenta? <Link to={'/register'} className="register-link">Registrate</Link>
            </p>
          </div>
        </form>
        </div>
      )}
    </section>
  );
};
