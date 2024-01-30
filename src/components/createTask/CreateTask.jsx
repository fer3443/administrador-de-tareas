import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "../createTask/CreateTask.css";
import { AddTask } from "../../service/taskService";
export const CreateTask = () => {
	const { userData: {user} } = useContext(UserContext);
	
	const [ data, setData ] = useState({
		title: "",
		description: ""
	})
	function handleChange(e){
		const {name, value} = e.target
		
		setData((prevData) => ({
			...prevData,
			[name]:value
		}))
	}
	function handleSubmitTask(e){
		e.preventDefault()
		AddTask({
			title: data.title,
			description: data.description,
			token: user.token
		})
		.then(res => {
			console.log(res)
			setData({
				title: "",
				description: ""
			})
		})
		.catch(err => console.log(err))
	}
  return (
		<section className="section create-task">
			<div className="container-create-task container">
				<h2 className="section-title">Ingresá una nueva tarea</h2>
				<h3 className="section-subtitle">Completa los siguientes campos</h3>
				<form action="">
					<div className="box-title">
						<input type="text" name="title" value={data.title} placeholder="Titulo de la tarea" onChange={handleChange}/>
					</div>
					<div className="box-description">
						<input type="textarea" name="description" value={data.description} placeholder="Descripcion de la tarea" onChange={handleChange}/>
					</div>
					<button type="submit" onClick={handleSubmitTask}>crear tarea</button>
				</form>
			</div>
		</section>
	);
};
