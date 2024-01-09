import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { NavbarTask } from "../navbar/NavbarTask";
import "../profile/UserProfile.css";

export const UserProfile = () => {
  const {userData: {user}} = useContext(UserContext)
  return (
    <header>
      <h1>{user.userName}</h1>
      <NavbarTask />
    </header>
  );
};