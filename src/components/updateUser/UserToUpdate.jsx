import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { UpdateUser } from "../../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "../updateUser/UserToUpdate.css";
import { Loader } from "../loader/Loader";
import { Notification } from "../../service/ToastNotification";
export const UserToUpdate = ({ show, setShow }) => {
  const {
    userData: { dataLogin },
    setReload,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [dataForm, setDataForm] = useState({
    name: dataLogin.user.name,
    avatar: dataLogin.user.avatar,
    updatedAt: new Date(),
  });
  const handleLoad = () => {
    setReload(true);
    setLoading(false);
    setShow(false)
    Notification({
      message: 'Datos actualizados con exito',
      type: 'success'
    })
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    UpdateUser({
      token: dataLogin.token,
      name: dataForm.name,
      avatar: dataForm.avatar,
      updatedAt: dataForm.updatedAt,
    })
      .then((res) => {
        localStorage.setItem("loginData", JSON.stringify(res));
        handleLoad()
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <section className={show ? "section-user-to-update" : "hidden"}>
      <div className="container-user-to-update container grid">
        <div className="wrapper normal-height">
          <div className="box-title-tagclose">
            <h3>Actualizar perfil</h3>
            <button onClick={() => setShow(false)}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <form action="" className="form-user-to-update">
              <label htmlFor="name" className="box-input">
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={dataForm.name}
                  onChange={handleChange}
                  id="name"
                />
              </label>
              <label htmlFor="avatar" className="box-input">
                Avatar:
                <input
                  type="text"
                  name="avatar"
                  value={dataForm.avatar}
                  onChange={handleChange}
                  id="avatar"
                />
              </label>
              <button type="submit" onClick={handleUpdate} className="btn">
                actualizar
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
