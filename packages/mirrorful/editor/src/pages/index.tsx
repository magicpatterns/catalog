import { Dashboard } from '@mirrorful/core/lib/components/Dashboard'
import ServerEndedMessage from '@mirrorful/core/lib/components/ServerEndedMessage'
import { TConfig } from '@mirrorful/core/lib/types'
import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'

export default function Editor() {
  const [hasShutDown, setHasShutDown] = useState(false)
  const isShuttingDown = useRef<boolean>(false) // need this to keep it from rerendering
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
      {hasShutDown ? (
        <ServerEndedMessage />
      ) : (
        <Dashboard
          fetchStoreData={async () => {
            const response = await fetch('/api/config')
            const data: TConfig = await response.json()

            return data
          }}
          postStoreData={async (data) => {
            await fetch('/api/export', {
              method: 'POST',
              body: JSON.stringify(data),
            })
          }}
        />
      )}
    </>
  )
}
