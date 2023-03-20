import { Container, Grid } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/react'
import { Dashboard } from '@mirrorful/core/lib/components/Dashboard'
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
            setHasShutDown(() => true)
            counter.current = true
          }
        })
        .catch(() => {
          if (navigator.onLine) {
            setHasShutDown(() => true)
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
      {hasShutDown ? (
        <Grid placeContent={'center'} minHeight="100svh">
          <Text css={{ textAlign: 'center', fontSize: '5rem' }}>
            Mirrorful Server Has Been Shut Down!
          </Text>
          <Text css={{ textAlign: 'center', fontSize: '2rem', color: 'grey' }}>
            To start the server again, go to the terminal and type{' '}
            <Text css={{ textAlign: 'center', color: 'purple' }}>
              yarn run mirrorful
            </Text>
            OR{' '}
            <Text css={{ textAlign: 'center', color: 'purple' }}>
              npx mirrorful
            </Text>
          </Text>
        </Grid>
      ) : (
        <Dashboard />
      )}
    </>
  )
}
