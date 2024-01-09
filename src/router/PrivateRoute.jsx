import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
	const { userData: {isLogged} } = useContext(UserContext);
	const location = useLocation()

	if(!isLogged){
		return <Navigate to={'/'}/>
	}else{
		return children
	}
}
