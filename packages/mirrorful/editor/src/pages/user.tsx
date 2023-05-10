import {
  useLogoutFunction,
  useRedirectFunctions,
  withAuthInfo,
} from '@propelauth/react'
import { useState } from 'react'

function whoAmI(accessToken: string | null) {
  return fetch('http://localhost:8080/api/whoami', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

const User = withAuthInfo((props) => {
  const [serverResponse, setServerResponse] = useState(undefined)

  const fetchWhoAmI = () => {
    //@ts-ignore
    whoAmI(props.accessToken).then(setServerResponse)
  }

  return (
    <div>
      <button onClick={fetchWhoAmI}>Fetch</button>
      {props.isLoggedIn ? (
        <p>You are logged in as {props.user.email}</p>
      ) : (
        <p>You are not logged in</p>
      )}
      <b>Server Response:</b>
      <pre>{JSON.stringify(serverResponse)}</pre>
    </div>
  )
})

export default User
