import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import { LoginUser } from "../../service/api";
import { Loader } from "../loader/Loader";
import { Notification } from "../../service/ToastNotification";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";

import "../login/Login.css";

export const Login = () => {
  const { setUserData } = useContext(UserContext);
  const [isChecked, setIsChecked] = useState(true);
  const [data, setData] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => setIsChecked(!isChecked);

  const validate = (array) => {
    if(array.userName.trim() ==='' || array.password.trim() ===''){
      Notification({
        message: 'Todos los campos deben ser completados',
        type: 'error'
      })
      return false
    }
    return true
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!validate(data)){
      return
    }
    setLoading(true);
    LoginUser({
      userName: data.userName,
      password: data.password,
      allowLS: isChecked,
    })
      .then((res) => {
        setLoading(false);
        setUserData({
          dataLogin: res,
          isLogged: true,
        });
        console.log(res);
        setData({
          userName: "",
          password: "",
        });
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        setData((prevData) => ({
          ...prevData,
        }));
        Notification({
          message: `${err}`,
          type: "error",
        });
      });
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
                  checked={isChecked}
                  onChange={handleCheck}
                />
                Mantenerme conectado
              </label>
              <Link to={"/"} className="link-forgot">
                Olvide mi contraseña
              </Link>
            </div>
            <button type="submit" onClick={handleSubmit} className="btn">
              Iniciar sesión
            </button>
            <div className="register-box">
              <p>
                ¿No tienes cuenta?{" "}
                <Link to={"/register"} className="register-link">
                  Registrate
                </Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
