import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { NavbarTask } from "../navbar/NavbarTask";
import "../profile/UserProfile.css";

export const UserProfile = () => {
  const {
    userData: { dataLogin },
  } = useContext(UserContext);
  return (
    <>
      <main>
        <NavbarTask />
        <section>
          <h2>{dataLogin.user.userName}</h2>
          <h3>Mi perfil</h3>
        </section>
      </main>
    </>
  );
};
