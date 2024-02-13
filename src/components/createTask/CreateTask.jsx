import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { AddTask } from "../../service/taskService";
import { Notification } from "../../service/ToastNotification";
import "../createTask/CreateTask.css";

export const CreateTask = () => {
  const {
    userData: { dataLogin },
    setReload,
  } = useContext(UserContext);
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const validateForm = (values) => {
    if(values.title.trim() === "" || values.description.trim() === ""){
      Notification({
        message:'Todos los campos deben ser completados',
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
  function handleSubmitTask(e) {
    e.preventDefault();
    if(!validateForm(data)){
      return
    }
    AddTask({
      title: data.title,
      description: data.description,
      token: dataLogin.token,
    })
      .then((res) => {
        setData({
          title: "",
          description: "",
        });
        setReload(true);
        Notification({
          message: `${res.msg}`,
          type: 'success'
        })
      })
      .catch((err) => {
        Notification({
          message: `${err}`,
          type: 'error'
        })
      });
  }

  return (
    <section className="section create-task">
      <div className="container-create-task container grid">
        <h2 className="section-title">Bienvenido {dataLogin.user.name}</h2>
        <h3 className="section-subtitle">Ingresa una nueva tarea</h3>
        <div className="wrapper">
          <h3 className="section-subtitle">Completa los siguientes campos</h3>
          <form action="">
            <div className="box-input">
              <input
                type="text"
                name="title"
                value={data.title}
                placeholder="Nombre de la tarea"
                maxLength={100}
                onChange={handleChange}
              />
            </div>
            <div className="box-input">
              <input
                type="text"
                name="description"
                value={data.description}
                placeholder="Descripcion de la tarea"
                maxLength={700}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn" onClick={handleSubmitTask}>
              crear tarea
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
