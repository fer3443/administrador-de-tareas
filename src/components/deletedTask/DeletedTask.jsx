import React, { useContext, useEffect, useState } from "react";
import { useGetTasks } from "../../hooks/useGetTasks";
import { GetTaskByUser, DeleteTask } from "../../service/taskService";
import { UserContext } from "../../context/UserContext";
import { Notification } from "../../service/toastNotification";
import '../deletedTask/DeletedTask.css'
export const DeletedTask = () => {
	const { userData: { dataLogin },  reload, setReload} = useContext(UserContext);
	const { dataTask } = useGetTasks(GetTaskByUser, dataLogin.token, reload, setReload);
	function handleDeleteTask(id){
    DeleteTask({
      token: dataLogin.token,
      id: id
    })
    .then(res => {
      setReload(true)
      Notification({
        message: `${res.msg}`,
        type: 'success'
      })
    })
    .catch(err => {
     console.log(err)
      Notification({
        message: 'Ups! hubo un error al eliminar tarea',
        type: 'error'
      })
    })
  }
	
  return (
		<section className="section-deletedTask section">
			<h2 className="section-title">Historial de tareas</h2>
			<div className="container-deletedTask container grid">
			{dataTask.filter(element => element.virtual_delete === true).map((item, index) => {
          const fecha = new Date(item.createdAt).toLocaleString()
          return (
            <div className="card-task" key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span>{fecha}</span>
              <button className="btn-task" onClick={() => handleDeleteTask(item.taskId)}>eliminar</button>
            </div>
          );
        })}
			</div>
		</section>
	);
};
