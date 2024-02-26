import React, { useContext, useState } from "react";
import { motion } from "framer-motion";

import { UserContext } from "../../context/UserContext";
import { GetTaskByUser, TemporalDelete } from "../../service/taskService";

import { Notification } from "../../service/ToastNotification";
import { useGetTasks } from "../../hooks/useGetTasks";
import { TaskToUpdate } from "../updateTask/TaskToUpdate";
import "../taskList/TaskList.css";
import { useReadUserData } from "../../hooks/useReadUserData";
import { ReadUserById } from "../../service/api";

export const TaskList = () => {
  const {
    userData: { dataLogin },
    reload,
    setReload,
  } = useContext(UserContext);
  const {data} = useReadUserData(ReadUserById,dataLogin.token, reload, setReload)
  const { dataTask } = useGetTasks(
    GetTaskByUser,
    dataLogin.token,
    reload,
    setReload
  );
  //renderizar componente TaskToUpdate
  const [showEdit, setShowEdit] = useState(false);
  const [readId, setReadId] = useState(null);
  function handleTaskId(taskId) {
    setReadId(taskId);
    setShowEdit(true);
  }
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
      <h2 className="section-title">Tus tareas</h2>
      <div className="container-task grid">
          {showEdit ? (
            <TaskToUpdate id={readId} setShowEdit={setShowEdit} />
          ) : (
            dataTask
              .filter((element) => element.virtual_delete === false)
              .map((item, index) => {
                const fecha = new Date(item.createdAt).toLocaleString();
                const taskCompleted = item.completed
                  ? "Terminada"
                  : "Sin terminar";
                return (
                  <div className="card-task" key={index}>
                    <h3>{item.title}</h3>
                    <p>Descripcion: {item.description}</p>
                    <span>Fecha: {fecha}</span>
                    <span>Tarea completada: {taskCompleted}</span>
                    <div className="box-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleTaskId(item.taskId)}
                      >
                        {" "}
                        editar tarea
                      </button>
                      <button
                        className="btn-task"
                        onClick={() => handleVirtualDelete(item.taskId)}
                      >
                        eliminar
                      </button>
                    </div>
                  </div>
                );
              })
          )}
        </div>
    </section>
  );
};
