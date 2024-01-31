import React, { createContext, useState } from "react";

export const UserContext = createContext();

const initialUserInfo = {
  dataLogin: null,
  isLogged: false,
  allowLS: false,
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialUserInfo);
  const initialValues = {
    userData,
    setUserData,
  };

  return (
    <UserContext.Provider value={initialValues}>
      {children}
    </UserContext.Provider>
  );
};
