import React, { useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";

import { UserContext } from "../../context/UserContext";
import { AddTask } from "../../service/taskService";
import { Notification } from "../../service/ToastNotification";

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import "../createTask/CreateTask.css";
import { useReadUserData } from "../../hooks/useReadUserData";
import { ReadUserById } from "../../service/api";
export const CreateTask = () => {
  const {
    userData: { dataLogin },
    reload,
    setReload,
  } = useContext(UserContext);
  const {data} = useReadUserData(ReadUserById, reload, setReload)
  const [dataTask, setDataTask] = useState({
    title: "",
    description: "",
  });
//estado para la fecha
  const [ date, setDate ] = useState(new Date())

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

    setDataTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function handleSubmitTask(e) {
    e.preventDefault();
    if(!validateForm(dataTask)){
      return
    }
    AddTask({
      title: dataTask.title,
      description: dataTask.description,
      createdAt: date,
      token: dataLogin.token,
    })
      .then((res) => {
        console.log(res)
        setDataTask({
          title: "",
          description: "",
        })
        setDate(null)
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
        <h2 className="section-title">Bienvenido {data.name}</h2>
        <h3 className="section-subtitle">Ingresa una nueva tarea</h3>
        <div className="wrapper">
          <h3 className="section-subtitle">Completa los siguientes campos</h3>
          <form action="">
            <div className="box-input">
              <input
                type="text"
                name="title"
                value={dataTask.title}
                placeholder="Nombre de la tarea"
                maxLength={100}
                onChange={handleChange}
              />
            </div>
            <div className="box-input">
              <input
                type="text"
                name="description"
                value={dataTask.description}
                placeholder="Descripcion de la tarea"
                maxLength={700}
                onChange={handleChange}
              />
            </div>
            <div className="box-date-time">
             <DateTimePicker onChange={setDate} value={date} locale="es-AR"/>
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
