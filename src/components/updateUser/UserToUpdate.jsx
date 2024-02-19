import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { UpdateUser } from "../../service/api";
import '../updateUser/UserToUpdate.css'
export const UserToUpdate = () => {
  const { userData: {dataLogin}, userData: {dataLogin: {user}}, setReload } = useContext(UserContext);//cambiar a datos de la funcion readUser
  const [data, setData] = useState({
    name: user.name,
    avatar: user.avatar,
		updatedAt: new Date()
  });
  const handleUpdate = (e) => {
		e.preventDefault()
		UpdateUser({
			token: dataLogin.token,
			name: data.name,
			avatar: data.avatar,
			updatedAt: data.updatedAt
		})
		.then(res => {
      setReload(true)
			console.log(res)
		})
		.catch(err => console.log(err))
	};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <section className="section-user-to-update section">
      <div className="container-user-to-update container grid">
       <div className="wrapper">
				<h3>Actualizar perfil</h3>
			 <form action="" className="form-user-to-update">
          <label htmlFor="name" className="box-input">Nombre:
            <input type="text" name="name" value={data.name} onChange={handleChange} id="name" />
          </label>
          <label htmlFor="avatar" className="box-input">Avatar:
            <input type="text" name="avatar" value={data.avatar} onChange={handleChange} id="avatar" />
          </label>
				<button type="submit" onClick={handleUpdate} className="btn">actualizar</button>
        </form>
			 </div>
      </div>
    </section>
  );
};
