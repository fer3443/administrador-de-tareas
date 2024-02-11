import React, { useContext, useEffect } from 'react'
import { Login } from '../components/login/Login';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const LoginPage = () => {
  const navigate = useNavigate()
	const { userData: {isLogged} } = useContext(UserContext);

  useEffect(() => {
    if(isLogged){
      navigate('/home')
    }
  }, [isLogged])
  
  return (
  <>
   {
     !isLogged && <Login/>
   }
  </>
  )
}
