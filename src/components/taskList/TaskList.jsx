import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { GetTaskByUser } from "../../service/taskService";
import '../taskList/TaskList.css'

export const TaskList = () => {
  const {
    userData: { dataLogin },
  } = useContext(UserContext);
  const [dataTask, setDataTask] = useState([]);

  useEffect(() => {
    GetTaskByUser({
      token: dataLogin.token,
    })
      .then(({ data }) => {
				console.log(data)
        setDataTask(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="section-task-list section">
      <h2 className="section-title">Tareas de {dataLogin.user.userName} </h2>
      <div className="container-task grid">
        {dataTask.map((item) => {
          return (
            <div className="card-task" key={item.taskID}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <span>{item.createdAt}</span>
              <button>eliminar</button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
