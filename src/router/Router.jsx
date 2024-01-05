import { BrowserRouter, Routes, Route } from "react-router-dom";
import {HomePage} from '../routes/HomePage'
import React from 'react'
import { LoginPage } from "../routes/LoginPage";

export const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
					<Route path="/" element={<HomePage/>}/>
					<Route path="/login" element={<LoginPage/>}/>
				</Routes>
    </BrowserRouter>
  )
}
