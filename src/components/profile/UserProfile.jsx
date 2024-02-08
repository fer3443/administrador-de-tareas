import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { NavbarTask } from "../navbar/NavbarTask";
import "../profile/UserProfile.css";
import { DeletedTask } from "../deletedTask/DeletedTask";

export const UserProfile = () => {
  const {
    userData: { dataLogin },
  } = useContext(UserContext);
  return (
    <>
      <main>
        <NavbarTask />
        <section className="section-profile section">
          <h2>{dataLogin.user.userName}</h2>
          <h3>Mi perfil</h3>
        </section>
        <DeletedTask/>
      </main>
    </>
  );
};
