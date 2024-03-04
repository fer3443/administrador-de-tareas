import React, { useState } from "react";
import "../recPassword/RecoverPassword.css";
import { ForgotPassword } from "../../service/api";
import { Notification } from "../../service/ToastNotification";
import { Loader } from "../loader/Loader";
import { Link } from "react-router-dom";
import { ResetPass } from "../resetPass/ResetPass";
export const RecoverPassword = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    userName: "",
  });
  const validateInput = () => {
    if (data.userName === "") {
      Notification({
        message: "Debe completar el campo con su email",
        type: "error",
      });
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      [name]: value,
    });
  };
  const handleForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!validateInput()) {
      return;
    }
    setLoading(true);
    ForgotPassword({
      userName: data.userName,
    })
      .then((res) => {
        setLoading(false);
        setStep(2)
        setData({
          userName: "",
        });
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
    <main>
      {loading ? (
        <Loader />
      ) : (
        <section className="section-recover-pass section">
         {
          step === 1 && (
            <div className="container-recover-pass container grid">
            <Link to={"/"} className="link-back">
              Login
            </Link>
            <h1 className="section-title">Recuperacion de Contraseña</h1>
            <h3 className="section-subtitle">
              Para recuperar su contraseña por favor ingrese su email
            </h3>
            <div className="wrapper">
              <form action="" className="recover-pass-form">
                <label htmlFor="userName" className="box-input">
                  {" "}
                  Ingrese su email:
                  <input
                    type="email"
                    name="userName"
                    value={data.userName}
                    onChange={handleChange}
                    id="userName"
                    required
                  />
                </label>
                <button type="submit" onClick={handleForm} className="btn">
                  Enviar
                </button>
              </form>
            </div>
          </div>
          )
         }
         {
          step === 2 && (
            <div className="container-recover-pass container grid">
               <Link to={"/"} className="link-back">
              Login
            </Link>
            <h1 className="section-title">Recuperacion de Contraseña</h1>
            <h2 className="subtitle-recover-pass">Por favor verifique su casilla de correo, hemos enviado un email para recuperar su contraseña.</h2>
            <ResetPass/>
            </div>
          )
         }
        </section>
      )}
    </main>
  );
};
