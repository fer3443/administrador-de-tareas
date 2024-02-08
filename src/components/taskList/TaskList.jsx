import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { GetTaskByUser, TemporalDelete } from "../../service/taskService";

import { Notification } from "../../service/toastNotification";
import { useGetTasks } from "../../hooks/useGetTasks";
import "../taskList/TaskList.css";

export const TaskList = () => {
  const {
    userData: { dataLogin },
    reload,
    setReload
  } = useContext(UserContext);
  const { dataTask } = useGetTasks(GetTaskByUser, dataLogin.token, reload, setReload)

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
