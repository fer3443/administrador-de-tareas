import { useEffect, useState } from "react";

export const useGetTaskbyId = (call, productId, reload, setReload) => {
  const [response, setResponse] = useState({
    data: [],
    error: false,
    msg: "",
  });

  useEffect(() => {
    call({
      productId,
    })
		.then(({ getedTask }) => {
      setResponse({
        data: getedTask,
        error: false,
        msg: "respuesta exitosa",
      })
      console.log(data)
      setReload(false)
		.catch((err) => {
        setResponse({
          data: [],
          error: true,
          msg: "error en la peticion " + err,
        });
      });
    });
  }, [reload]);

  return response;
};
