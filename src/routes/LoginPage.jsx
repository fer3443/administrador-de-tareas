import React, { useContext } from 'react'
import { Login } from '../components/login/Login';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const LoginPage = () => {
  const navigate = useNavigate()
	const { userData: {isLogged} } = useContext(UserContext);
  return (
  <>
   {
     isLogged ? navigate('/home') :  <Login/>
   }
  </>
  )
}
