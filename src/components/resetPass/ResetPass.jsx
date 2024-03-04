import React, { useState } from 'react'
import { ResetPassword } from '../../service/api';
import { Notification } from '../../service/ToastNotification';
import { useNavigate } from 'react-router-dom';

export const ResetPass = () => {
	const navigate = useNavigate()
	const [ data, setData ] = useState({
		token: '',
		password: '',
		confirmPass: ''
	})

	const handleChange = (e) => {
		const {name, value} = e.target;
		setData({
			...data,
			[name]: value
		})
	}
	const validationInputs = () => {
		if(data.token === "" || data.password === "" || data.confirmPass === ""){
			Notification({
				message: "Debe completar todos los campos",
				type: "error"
			})
			return false
		}
		const alphanumeric = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if(!alphanumeric.test(data.password)){
      Notification({message: 'La contraseña debe tener como minimo 6 caracteres incluyendo una mayuscula y un numero', type: 'error'});
      return false
    }
		if(data.password !== data.confirmPass){
			Notification({
				message: "Las contraseñas no coinciden",
				type: "error"
			})
			return false
		}
		return true
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if(!validationInputs()){
			return
		}
		ResetPassword({
			password: data.password,
			token: data.token
		})
		.then(res => {
			console.log(res)
			Notification({
				message: `Contraseña actualizada con exito`,
				type: "success"
			})
			navigate("/")
		})
		.catch(err => {
			console.log(err)
			Notification({
				message: `${err}`,
				type: "error"
			})
		})
	}
  return (
    <div className='wrapper'>
			<form action="" className='recover-pass-form'>
				<label htmlFor="validation-token" className="box-input">Pegue aquí su codigo de validación:
					<input type="text" name="token" value={data.token} onChange={handleChange} id="validation-token" />
				</label>
				<label htmlFor="password" className="box-input">Ingrese su nueva contraseña:
					<input type="password" name="password" value={data.password} onChange={handleChange} id="password" />
				</label>
				<label htmlFor="password-confirm" className="box-input">Repita su contraseña:
					<input type="password" name="confirmPass" value={data.confirmPass} onChange={handleChange} id="password-confirm" />
				</label>
				<button type='submit' onClick={handleSubmit} className='btn'>confirmar</button>
			</form>
		</div>
  )
}
