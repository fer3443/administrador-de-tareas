import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { GetTaskByUser } from "../../service/taskService";
import "../taskList/TaskList.css";

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

  return (
    <section className="section-task-list section">
      <h2 className="section-title">Tareas de {dataLogin.user.name} </h2>
      <div className="container-task grid">
        {dataTask.map((item, index) => {
          const fecha = new Date(item.createdAt).toLocaleString()
          return (
            <div className="card-task" key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span>{fecha}</span>
              <button className="btn-task">eliminar</button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
