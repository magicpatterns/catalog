import { Dashboard } from '@mirrorful/core/lib/components/Dashboard'
import ServerEndedMessage from '@mirrorful/core/lib/components/ServerEndedMessage'
import { TConfig } from '@mirrorful/core/lib/types'
import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'

export default function Editor() {
  const [hasShutDown, setHasShutDown] = useState(false)
  const counter = useRef<boolean>(false)
  useEffect(() => {
    function pollForServerEndCheck() {
      fetch('http://localhost:5050/api/longPoll', { keepalive: true })
        .then((res) => res.text())
        .then((res) => {
          if (res === 'exiting') {
            setHasShutDown(true)
            counter.current = true
          }
        })
        .catch(() => {
          if (navigator.onLine) {
            setHasShutDown(true)
            counter.current = true
          }
        })
        .finally(() => {
          if (!counter.current) {
            pollForServerEndCheck()
          }
        })
    }
    if (!counter.current) {
      pollForServerEndCheck()
    }
  }, [hasShutDown, counter])
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
      {
        hasShutDown ? <ServerEndedMessage /> :
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
       }
    </>
  )
}
