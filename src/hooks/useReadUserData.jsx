import React, { useEffect, useState } from 'react'

export const useReadUserData = (call, token, reload, setReload) => {
	const [response, setResponse] = useState({
		data: [],
		msg:'',
		error: false
	})

	useEffect(() => {
		call({
			token
		})
		.then(({readedUser}) => {
			setResponse({
				data: readedUser,
				msg: '',
				error: false
			})
			setReload(false)
		})
		.catch(err => {
			setResponse({
				data: [],
				msg: err,
				error: true
			})
		})
	}, [reload])
	
	return response;
}
