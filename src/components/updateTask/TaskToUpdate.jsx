import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

import { GetTaskById, UpdateTask } from "../../service/taskService";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import "../updateTask/TaskToUpdate.css";
import { Notification } from "../../service/ToastNotification";
export const TaskToUpdate = ({id, setShowEdit}) => {
  const { userData: {dataLogin}, reload, setReload } = useContext( UserContext)
  const [ isCheck, setIsCheck] = useState(false)
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    createdAt: new Date(),// verificar fecha
    completed: false
  });
  useEffect(() => { 
    GetTaskById({
      id
    })
    .then(({getedTask}) => {
      setNewTask({
        title: getedTask.title,
        description: getedTask.description,
        createdAt: new Date(getedTask.createdAt),
        completed: getedTask.completed
      })
      setReload(false)
    })
    .catch(err => console.log(err))
  }, [reload])
 
  const handleUpdateChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNewTask((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleCheck = () => {
    setIsCheck(!isCheck)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    UpdateTask({
      taskId: id,
      token: dataLogin.token,
      title: newTask.title,
      description: newTask.description,
      createdAt: newTask.createdAt,
      completed: isCheck
    })
    .then(res => {
      setReload(true)
      Notification({
        message: "Tarea modificada con exito",
        type: "success"
      })
      setShowEdit(false)
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="card-task-update">
      <form action="">
        <label htmlFor="title">
          <input
            type="text"
            name="title"
            id="title"
            value={newTask.title}
            onChange={handleUpdateChange}
          />
        </label>
        <label htmlFor="decription">
          Descripción:
          <input
            type="text"
            name="description"
            id="description"
            value={newTask.description}
            onChange={handleUpdateChange}
          />
        </label>
        <label htmlFor="">
          Fecha:
          <DateTimePicker name="createdAt" value={newTask.createdAt} onChange={handleUpdateChange} locale="es-AR" />
        </label>
        <label htmlFor="completed">
          <input
            type="checkbox"
            name="completed"
            id="completed"
            checked={isCheck}
            onChange={handleCheck}
          />{" "}
          Tarea completada
        </label>
      </form>
      <div className="box-buttons-task">
        <button className="btn-task-update" onClick={() => setShowEdit(false)}>cancelar</button>
        <input
          type="submit"
          value="aceptar"
          className="btn-task-update confirm"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
