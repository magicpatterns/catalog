'use client'
import {
  MirrorfulApiClient,
  MirrorfulApiEnvironment,
} from '@mirrorful-fern/api-client'
import {
  useLogoutFunction,
  useRedirectFunctions,
  withAuthInfo,
} from '@propelauth/react'
import { useState } from 'react'

async function testApiUpdateCall() {
  const environment =
    process.env.NODE_ENV === 'production'
      ? MirrorfulApiEnvironment.Production
      : MirrorfulApiEnvironment.Development
  const client = new MirrorfulApiClient({
    environment,
  })
  const response = await client.registry.updateStore('123', '123', {
    primitives: {
      colors: { primary: 'red' },
      typography: {
        fontSizes: { tokens: 'Arial' },
        fontWeights: { tokens: 'bold' },
        lineHeights: { tokens: '1.5' },
      },
      shadows: { primary: '1px 1px 1px 1px' },
    },
    themes: [{ id: '123', name: 'themename', tokens: { token: 'test' } }],
    files: 'css',
  })
  console.log('response of updateStore', response)
}

async function testApiGetCall() {
  const environment =
    process.env.NODE_ENV === 'production'
      ? MirrorfulApiEnvironment.Production
      : MirrorfulApiEnvironment.Development
  const client = new MirrorfulApiClient({
    environment,
  })
  const response = await client.registry.getStore('123', '123')
  console.log('response of getStore', response)
}

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
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } =
    useRedirectFunctions()
  const logoutFunction = useLogoutFunction()

  const fetchWhoAmI = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    whoAmI(props.accessToken).then(setServerResponse)
  }

  return (
    <div>
      <button onClick={fetchWhoAmI}>Fetch WhoAmi</button>
      <br />
      <button onClick={testApiUpdateCall}>Test Api Update Call</button>
      <br />
      <button onClick={testApiGetCall}>Test Api Get Call</button>
      <br />
      {props.isLoggedIn ? (
        <>
          <p>You are logged in as {props.user.email}</p>
          <br />
          <button onClick={redirectToAccountPage}>Account</button>
          <br />
          <button onClick={() => logoutFunction}>Logout</button>
          <br />
        </>
      ) : (
        <>
          <br />
          <p>You are not logged in</p>
          <br />
          <button onClick={() => redirectToLoginPage()}>Login</button>
          <br />
          <button onClick={() => redirectToSignupPage}>Signup</button>
          <br />
        </>
      )}
      <br />
      <b>Whoami Server Response:</b>
      <br />
      <pre>{JSON.stringify(serverResponse)}</pre>
    </div>
  )
})

export default User
