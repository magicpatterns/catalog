import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

export default function Editor() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/colors')
  }, [router])

  const [hasShutDown, setHasShutDown] = useState(false)
  const isShuttingDown = useRef<boolean>(false) // need this to keep it from rerendering

  // TODO(Danilowicz): when we let the user choose their own, we'll need to change this
  const PORT = 5050
  const URL = 'http://localhost'

  useEffect(() => {
    function pollForServerEndCheck() {
      fetch(`${URL}:${PORT}/api/longPoll`, { keepalive: true })
        .then((res) => res.text())
        .then((res) => {
          if (res === 'exiting') {
            setHasShutDown(true)
            isShuttingDown.current = true
          }
        })
        .catch(() => {
          if (navigator.onLine) {
            setHasShutDown(true)
            isShuttingDown.current = true
          }
        })
        .finally(() => {
          if (!isShuttingDown.current) {
            pollForServerEndCheck()
          }
        })
    }
    if (!isShuttingDown.current) {
      pollForServerEndCheck()
    }
  }, [hasShutDown])

  return (
    <>
      <Head>
        <title>Mirrorful Editor</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Local editor for your design system"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
