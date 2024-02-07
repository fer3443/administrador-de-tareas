import React, { useEffect, useState } from 'react'

export const useGetTasks = (call, token, reload ,setReload) => {
    const [response, setResponse] = useState({
        dataTask: [],
        error: false,
				msg: ""
    })

    useEffect(() => {
      call({
        token
      })
      .then(({data}) => {
        setResponse({
            ...response,
            dataTask: data
        })
				setReload(false)
      })
			.catch(err => {
				setResponse({
					dataTask: [],
					error: true,
					msg: "error al leer tareas " + err
				})
			})
    }, [reload])
    
  return response;
}