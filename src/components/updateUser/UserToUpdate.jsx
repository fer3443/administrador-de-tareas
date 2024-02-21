import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { UpdateUser } from "../../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import '../updateUser/UserToUpdate.css'
export const UserToUpdate = ({show, setShow}) => {
  const { userData: {dataLogin}, setReload } = useContext(UserContext);
  const [dataForm, setDataForm] = useState({
    name: dataLogin.user.name,
    avatar: dataLogin.user.avatar,
		updatedAt: new Date()
  });
  
  const handleUpdate = (e) => {
		e.preventDefault()
		UpdateUser({
			token: dataLogin.token,
			name: dataForm.name,
			avatar: dataForm.avatar,
			updatedAt: dataForm.updatedAt
		})
		.then(res => {
      localStorage.setItem("loginData", JSON.stringify(res))
      setReload(true)
			console.log(res)
		})
		.catch(err => console.log(err))
	};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <section className={show? "section-user-to-update section" : "hidden"}>
      <div className="container-user-to-update container grid">
       <div className="wrapper">
      <div className="box-title-tagclose">
      <h3>Actualizar perfil</h3>
      <button onClick={()=>setShow(false)}><FontAwesomeIcon icon={faX} /></button>
      </div>
			 <form action="" className="form-user-to-update">
          <label htmlFor="name" className="box-input">Nombre:
            <input type="text" name="name" value={dataForm.name} onChange={handleChange} id="name" />
          </label>
          <label htmlFor="avatar" className="box-input">Avatar:
            <input type="text" name="avatar" value={dataForm.avatar} onChange={handleChange} id="avatar" />
          </label>
				<button type="submit" onClick={handleUpdate} className="btn">actualizar</button>
        </form>
			 </div>
      </div>
    </section>
  );
};
