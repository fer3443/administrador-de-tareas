import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { DeleteTask, GetTaskByUser, TemporalDelete } from "../../service/taskService";
import "../taskList/TaskList.css";
import { Notification } from "../../service/toastNotification";

export const TaskList = () => {
  const {
    userData: { dataLogin },
    reload,
    setReload
  } = useContext(UserContext);
  const [dataTask, setDataTask] = useState([]);

  useEffect(() => {
    GetTaskByUser({
      token: dataLogin.token,
    })
      .then(({ data }) => {
        setDataTask(data);
        setReload(false)
      })
      .catch((err) => console.log(err));
  }, [reload]);
  function handleVirtualDelete(id){
    TemporalDelete({
      token: dataLogin.token,
      id: id
    })
    .then(res => {
      console.log(res)
      setReload(true)
      Notification({
        message: `${res.msg}`,
        type: 'success'
      })
    })
    .catch(err => {
      Notification({
        message: `${err}`
      })
    })
  }
  function handleDeleteTask(id){
    DeleteTask({
      token: dataLogin.token,
      id: id
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  return (
    <section className="section-task-list section">
      <h2 className="section-title">Tareas de {dataLogin.user.name} </h2>
      <div className="container-task grid">
        {dataTask.filter(element => element.virtual_delete === false).map((item, index) => {
          const fecha = new Date(item.createdAt).toLocaleString()
          return (
            <div className="card-task" key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span>{fecha}</span>
              <button className="btn-task" onClick={() => handleVirtualDelete(item.taskId)}>eliminar</button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
