import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ReadUserById } from "../service/api";

export const useReadUserData = (reload, setReload) => {
  const {
    userData: { dataLogin },
  } = useContext(UserContext);
  const [response, setResponse] = useState({
    data: [],
    msg: "",
    error: false,
  });

  useEffect(() => {
    ReadUserById({
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
