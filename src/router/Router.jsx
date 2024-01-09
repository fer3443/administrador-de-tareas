import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../routes/HomePage";
import { LoginPage } from "../routes/LoginPage";
import { ErrorPage } from "../routes/ErrorPage";
import { UserProvider } from "../context/UserContext";
import { ProfilePage } from "../routes/ProfilePage";

export const Router = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="*" element={<ErrorPage />}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};
