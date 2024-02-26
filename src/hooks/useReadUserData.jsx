import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export const useReadUserData = (call, reload, setReload) => {
  const {
    userData: { dataLogin },
  } = useContext(UserContext);
  const [response, setResponse] = useState({
    data: [],
    msg: "",
    error: false,
  });

  useEffect(() => {
    call({
      token: dataLogin.token
    })
      .then(({ readedUser }) => {
        setResponse({
          data: readedUser,
          msg: "",
          error: false,
        });
        setReload(false);
      })
      .catch((err) => {
        setResponse({
          data: [],
          msg: err,
          error: true,
        });
      });
  }, [reload]);

  return response;
};
