import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { GetTaskByUser, TemporalDelete } from "../../service/taskService";

import { Notification } from "../../service/ToastNotification";
import { useGetTasks } from "../../hooks/useGetTasks";
import "../taskList/TaskList.css";

export const TaskList = () => {
  const {
    userData: { dataLogin },
    reload,
    setReload,
  } = useContext(UserContext);
  const { dataTask } = useGetTasks(
    GetTaskByUser,
    dataLogin.token,
    reload,
    setReload
  );

  function handleVirtualDelete(id) {
    TemporalDelete({
      token: dataLogin.token,
      id: id,
    })
      .then((res) => {
        setReload(true);
        Notification({
          message: `${res.msg}`,
          type: "success",
        });
      })
      .catch((err) => {
        Notification({
          message: `${err}`,
        });
      });
  }

  return (
    <section className="section-task-list section">
      <h2 className="section-title">Tareas de {dataLogin.user.name} </h2>
      <div className="container-task grid">
        {dataTask
          .filter((element) => element.virtual_delete === false)
          .map((item, index) => {
            const fecha = new Date(item.createdAt).toLocaleString();
            const  taskCompleted = item.completed ? "Terminada" : "Sin terminar"
            return (
              <div className="card-task" key={index}>
                <h3>{item.title}</h3>
                <p>Descripcion: {item.description}</p>
                <span>Fecha: {fecha}</span>
                <span>Tarea completada: {taskCompleted}</span>
                <div className="box-buttons">
                  <button className="btn-edit"> editar tarea</button>
                  <button
                    className="btn-task"
                    onClick={() => handleVirtualDelete(item.taskId)}
                  >
                    eliminar
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};
